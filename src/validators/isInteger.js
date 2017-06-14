import validator from '../core/validator'
import { isValueEmpty, isValueNumeric } from '../utils/utils'

export default validator(value => {
  if (isValueEmpty(value)) return true
  if (!isValueNumeric(value)) return false
  if (typeof value === 'string' && value.indexOf('.') > -1) return false
  const floatValue = parseFloat(value)
  return Math.floor(floatValue) === floatValue
}, (param, name) => `${name} must be an integer.`)
