const validator = (checker, messageCreator) => param => {
  if (typeof param === 'function') {
    // Called to customize messageCreator function
    return validator(checker, param)
  }
  /*
   * Called in a regular way -> produce validator function that receives
   * a name and returns a function that validates a value
   */
  return name => value => {
    if (!checker(value, param)) {
      return messageCreator(param, name, value)
    }
    return undefined
  }
}

export default validator
