import validator from '../validator/validator'

export default validator((value, param) => value <= param, (param, name) => `${name} must not exceed ${param}.`)
