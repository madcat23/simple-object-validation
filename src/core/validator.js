const regularValidator = (checker, messageCreator, nameTransformer, param) => name => value => {
  const fieldName = nameTransformer ? nameTransformer(name) : name
  if (!checker(value, param)) {
    if (!messageCreator) throw new Error('No messageCreator given for validator.')
    return messageCreator(param, fieldName, value)
  }
  return undefined
}

const validator = (checker, configParam) => param => {
  // eslint-disable-next-line max-len
  const { messageCreator: messageCreatorProperty, nameTransformer, expectParameter = false } = configParam
  const messageCreator = typeof configParam === 'function' ? configParam : messageCreatorProperty

  if (typeof param === 'object') {
    const hasMessageCreatorParam = param.hasOwnProperty('messageCreator')
    const hasNameTransformerParam = param.hasOwnProperty('nameTransformer')

    if (hasMessageCreatorParam || hasNameTransformerParam) {
      // Called to customize error message
      const messageCreatorOverride = hasMessageCreatorParam ? param.messageCreator : messageCreator
      const nameTransformerOverride = hasNameTransformerParam ? param.nameTransformer : nameTransformer // eslint-disable-line max-len

      return validator(checker, {
        messageCreator: messageCreatorOverride,
        nameTransformer: nameTransformerOverride,
        expectParameter,
      })
    }
  }

  /*
   * Called without a param but directly with the field name:
   *
   * In some cases it can be useful not to expect a parameter.
   * In these cases the validator should behave like it was
   * already parameterized with undefined and interprete the "param"
   * as the field name.
   * This situation can be detected using a simple convention:
   * If there is not an explicit configuration set ({ expectParameter: true })
   * all parameters must be something like a number, an array or an object.
   * If the parameter type must be of type string, expectParameter must be set
   * to true.
   */
  if (typeof param === 'string' && !expectParameter) {
    return regularValidator(checker, messageCreator, nameTransformer, undefined)(param)
  }
  /*
   * Called in a regular way -> produce validator function that receives
   * a name and returns a function that validates a value
   */
  return regularValidator(checker, messageCreator, nameTransformer, param)
}

export default validator
