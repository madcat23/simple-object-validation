import validator from '../core/validator'
import { isValueEmpty, isValueAlphanumeric } from '../utils/utils'

export default validator((value) => {
  if (isValueEmpty(value)) return true
  if (typeof value === 'number' && isNaN(value)) return false

  return isValueAlphanumeric(value)
}, (param, name) => `${name} must be alphanumeric.`)
