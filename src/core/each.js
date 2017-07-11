export default getValidator => values => {
  if (Array.isArray(values)) {
    return values.map((value, index) => getValidator(index)(value))
  }
  return []
}
