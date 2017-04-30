// TODO: allow multiple results?
export default validators => name => value => {
  for (const validator of validators) {
    const result = validator(name)(value)
    if (typeof result === 'string') {
      return result
    }
  }
  return undefined
}
