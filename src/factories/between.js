import validator from '../validator/validator'
import { isValueEmpty, isValueNumeric } from '../utils/utils'

export default validator((value, param) => {
  if (isValueEmpty(value)) return true
  if (!isValueNumeric(value)) return false

  return value >= param.min && value <= param.max
}, (param, name) => `${name} must be between ${param.min} and ${param.max}.`)
