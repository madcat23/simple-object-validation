import validator from '../validator/validator'

export default validator(value => typeof value !== 'undefined' && value !== null, (param, name) => `${name} is required.`)
