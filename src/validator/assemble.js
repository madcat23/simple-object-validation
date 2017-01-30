export default validators => value => {
  const result = {}
  for (const property in validators) {
    if (validators.hasOwnProperty(property)) {
      const eachValidator = validators[property]

      // validate value:
      const validationResult = eachValidator(value[property])

      // check result:
      const resultIsEmptyObject = typeof validationResult === 'object' && Object.keys(validationResult).length === 0
      const resultIsUndefined = typeof validationResult === 'undefined'

      // TODO: Array results are also possible
      if (!resultIsUndefined && !resultIsEmptyObject) {
        result[property] = validationResult
      }
    }
  }
  return result
}
