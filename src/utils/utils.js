export const containsError = something => {
  if (typeof something === 'undefined') {
    return false
  }
  if (Array.isArray(something)) {
    const arrayContainsErrors = something.find(element => containsError(element))
    if (typeof arrayContainsErrors !== 'undefined') {
      return true
    }
  }
  if (typeof something === 'object') {
    let foundError = false
    for (const property in something) {
      if (something.hasOwnProperty(property)) {
        const value = something[property]
        if (containsError(value)) {
          foundError = true
          break
        }
      }
    }
    return foundError
  }
  return true
}

export const isValueEmpty = value => typeof value === 'undefined' || value === null || (typeof value === 'string' && value === '')
export const isValueNumeric = value => !isNaN(parseFloat(value)) && isFinite(value)
export const isValueAlphanumeric = value => /^[a-z0-9]+$/i.test(value)
