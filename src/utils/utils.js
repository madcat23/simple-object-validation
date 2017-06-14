export const isValueEmpty = value => typeof value === 'undefined' || value === null || (typeof value === 'string' && value === '')
export const isValueNumeric = value => !isNaN(parseFloat(value)) && isFinite(value)
export const isValueAlphanumeric = value => /^[a-z0-9]+$/i.test(value)
