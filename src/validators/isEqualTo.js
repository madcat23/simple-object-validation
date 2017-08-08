import validator from '../core/validator'
import { isValueEmpty } from '../utils/utils'

const ERROR_MESSAGE = 'Parameter must be an object like { property: \'foo\', name: \'bar\' } or { value: values => values.foo.bar, name: \'bar\' }.'

export default validator(
  (value, param, allValues) => {
    if (typeof param !== 'object') {
      throw Error(ERROR_MESSAGE)
    }
    if (typeof param.value !== 'function' && typeof param.property !== 'string') {
      throw Error(ERROR_MESSAGE)
    }

    const otherValue = typeof param.property === 'string' ? allValues[param.property] : param.value(allValues)

    if (isValueEmpty(value) && isValueEmpty(otherValue)) {
      return true
    }
    return value === otherValue
  },
  (param, name) => {
    if (typeof param.name === 'string') {
      return `${name} must be equal to ${param.name}.`
    }
    return 'The values must be equal.'
  }
)
