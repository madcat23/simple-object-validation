import { isValueEmpty } from '../utils/utils'

const defaultMessageCreator = (fieldName1, fieldName2) => `${fieldName1} is required when ${fieldName2} is given.`

// eslint-disable-next-line max-len
const regularIsRequiredIf = (property1, name1, property2, name2, messageCreator = defaultMessageCreator, nameTransformer) => (value, result) => {
  if (typeof value === 'undefined') {
    return result
  }

  const fieldName1 = nameTransformer ? nameTransformer(name1) : name1
  const fieldName2 = nameTransformer ? nameTransformer(name2) : name2

  const value1 = value[property1]
  const value2 = value[property2]

  if (!isValueEmpty(value2) && isValueEmpty(value1)) {
    return { ...result, [property1]: messageCreator(fieldName1, fieldName2, value1, value2) }
  }
  return result
}

const isRequiredIf = (param1, param2) => {
  /*
   * Called to override messageCreator and/or nameTransformer function
   */
  if (!Array.isArray(param1) && typeof param1 === 'object') {
    const messageCreator = param1.messageCreator ? param1.messageCreator : undefined
    const nameTransformer = param1.nameTransformer ? param1.nameTransformer : undefined

    // eslint-disable-next-line max-len
    return ([p1, n1], [p2, n2]) => regularIsRequiredIf(p1, n1, p2, n2, messageCreator, nameTransformer)
  }

  /*
   * Called in a regular way
   */
  const [property1, name1] = param1
  const [property2, name2] = param2

  return regularIsRequiredIf(property1, name1, property2, name2, undefined, undefined)
}

export default isRequiredIf
