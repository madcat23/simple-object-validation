export default getValidator => (values, allValues) => {
  if (Array.isArray(values)) {
    return values.map((value, index) => getValidator(index)(value, allValues))
  }
  return []
}
