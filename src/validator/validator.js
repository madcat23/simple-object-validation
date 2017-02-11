const regularValidator = (checker, messageCreator, param) => name => value => {
  if (!checker(value, param)) {
    return messageCreator(param, name, value)
  }
  return undefined
}

const validator = (checker, messageCreator) => param => {
  if (typeof param === 'function') {
    // Called to customize messageCreator function
    return validator(checker, param)
  }
  /*
   * Called without a config param but directly with the field name.
   * It is a convention that no configuration can be passed in as a string.
   * Every configuration object must be a number, an object or an array.
   * If no configuration is necessary it can be omitted.
   */
  if (typeof param === 'string') {
    return regularValidator(checker, messageCreator, undefined)(param)
  }
  /*
   * Called in a regular way -> produce validator function that receives
   * a name and returns a function that validates a value
   */
  return regularValidator(checker, messageCreator, param)
}

export default validator
