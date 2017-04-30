export default validators => values => values.map(
  (value, index) => validators[index](value))
