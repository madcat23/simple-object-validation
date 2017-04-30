export default getValidator => values => values.map((value, index) => getValidator(index)(value))
