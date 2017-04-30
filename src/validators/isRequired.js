import validator from '../core/validator'
import { isValueEmpty } from '../utils/utils'

export default validator(value => !isValueEmpty(value), (param, name) => `${name} is required.`)
