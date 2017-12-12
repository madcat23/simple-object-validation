import validator from '../core/validator'
import { isValueEmpty } from '../utils/utils'

export default validator(
  (value, param, allValues) => {
    if (typeof param !== 'function') {
      throw Error('Parameter must be a function.')
    }
    const condition = param(allValues)
    if (condition) {
      return !isValueEmpty(value)
    }
    return true
  },
  (param, name) => `${name} is required.`,
)
