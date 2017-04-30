export default (validators, options) => value => {
  const valueIsUndefined = typeof value === 'undefined' || value == null
  /*
   * In some cases it can be ok if the object that should be validated is undefined.
   * But this should be specified with a flag (ignoreIfMissing).
   */
  if (valueIsUndefined && typeof options === 'object' && options.ignoreIfMissing === true) {
    return {}
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

      // validate value:
      const validationResult = eachValidator(nestedValue)
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
  return result
}
