import each from './each'
/* global test, it, expect */


const containsLetterA = name => value => (value.indexOf('a') > -1 || value.indexOf('A') > -1 ? undefined : `${name}_HAS_NO_A`)


it('should validate each value in the array with the given validator', () => {
  const validate = each(index => containsLetterA(`VALUE_${index + 1}`))

  const values = ['Archibald', 'Rick', 'Steven', 'Matt']

  expect(validate(values)).toEqual([undefined, 'VALUE_2_HAS_NO_A', 'VALUE_3_HAS_NO_A', undefined])
})

it('should take allValues into account', () => {
  const validate = (value, allValues) => (value.indexOf(allValues.foo) > -1 ? undefined : 'ERROR')
  const allValues = { foo: 'bar' }

  const validateArray = each(() => validate)

  expect(validateArray(['bar1', 'bar2'], allValues)).toEqual([undefined, undefined])
  expect(validateArray(['bar1', 'b2ar'], allValues)).toEqual([undefined, 'ERROR'])
})
