export default validators => values => {
  if (Array.isArray(values)) {
    return values.map((value, index) => validators[index](value))
  }
  return []
}
