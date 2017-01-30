import validator from '../validator/validator'

export default validator((value, param) => value >= param.min && value <= param.max, (param, name) => `${name} must be between ${param.min} and ${param.max}.`)
