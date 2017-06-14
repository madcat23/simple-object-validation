import validator from '../core/validator'
import { isValueEmpty, isValueNumeric } from '../utils/utils'

export default validator((value) => {
  if (isValueEmpty(value)) return true
  return isValueNumeric(value)
}, (param, name) => `${name} must be numeric.`)
