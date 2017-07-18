// TODO: allow multiple results?
export default validators => name => (value, allValues) => {
  for (const validator of validators) {
    const result = validator(name)(value, allValues)
    if (typeof result === 'string') {
      return result
    }
  }
  return undefined
}
