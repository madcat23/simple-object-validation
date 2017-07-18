export default validators => (values, allValues) => {
  if (Array.isArray(values)) {
    return values.map((value, index) => validators[index](value, allValues))
  }
  return []
}
