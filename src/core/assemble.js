const evaluateParams = params => params.reduce((acc, value, index, array) => {
  if (index === array.length - 1 && typeof value === 'object') {
    return { ...acc, options: value }
  }
  return { ...acc, reducers: [...acc.reducers, value] }
}, { reducers: [] })

const checkForUnknownProperties = (validators, values, whitelist = []) => {
  const validatorKeys = Object.keys(validators)
  const valueKeys = Object.keys(values)

  for (let i = 0; i < whitelist.length; i++) {
    const entry = whitelist[i]
    const index = valueKeys.indexOf(entry)
    if (index > -1) {
      valueKeys.splice(index, 1)
    }
  }

  for (let i = 0; i < valueKeys.length; i++) {
    const value = valueKeys[i]
    if (validatorKeys.indexOf(value) === -1) {
      throw new Error(`No validator found for ${value}`)
    }
  }
}

export default (validators, ...params) => (value, allValues) => {
  const { reducers, options } = evaluateParams(params)

  const valueIsUndefined = typeof value === 'undefined' || value == null


  if (typeof options === 'object') {
    /*
    * In some cases it can be ok if the object that should be validated is undefined.
    * But this should be specified with a flag (ignoreIfMissing).
    */
    if (valueIsUndefined && options.ignoreIfMissing === true) {
      return {}
    }

    // if specified, check for unknown properties
    if (options.strictValidation === true) {
      checkForUnknownProperties(validators, value, options.whitelist)
    }
  }

  const result = {}
  for (const property in validators) {
    if (validators.hasOwnProperty(property)) {
      const eachValidator = validators[property]
      if (typeof eachValidator !== 'function') {
        throw new Error(`Error validating ${property}. Given validator is not a function. 
          Maybe a validator has already been called by mistake: e. g. isValid('param1')('param2')('field name')`)
      }

      let nestedValue
      /*
       * if the object itself is undefined, all the assembled validators are called with undefined
       * as well so that an error object for all the implicitly missing nested values can still be
       * created.
       */
      if (!valueIsUndefined) {
        // Typical case:
        nestedValue = value[property]
      }
      // else nestedValue = undefined

      // allValues given as parameter? If not, use given value object
      const allValuesForValidator = typeof allValues === 'object' ? allValues : value

      // validate value:
      const validationResult = eachValidator(nestedValue, allValuesForValidator)
      if (typeof validationResult === 'function') {
        throw new Error(`Error validating ${property}. Validation result is a function. 
          Maybe a validator has not been correctly parameterized (param, field name, etc.) ...`)
      }

      // check result: (TODO: change to whitelisting!)
      const resultIsEmptyObject = typeof validationResult === 'object' && Object.keys(validationResult).length === 0
      const resultIsEmptyArray = Array.isArray(validationResult) && validationResult.length === 0
      const resultIsUndefined = typeof validationResult === 'undefined'

      if (!resultIsUndefined && !resultIsEmptyObject && !resultIsEmptyArray) {
        result[property] = validationResult
      }
    }
  }

  if (reducers.length > 0) {
    return reducers.reduce((acc, reducer) => reducer(value, acc), result)
  }
  return result
}
