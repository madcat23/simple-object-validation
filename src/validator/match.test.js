import match from './match'
/* global test, it, expect */


const containsLetterA = name => value => (value.indexOf('a') > -1 || value.indexOf('A') > -1 ? undefined : `${name}_HAS_NO_A`)

const hasLengthLessThan5 = name => value => (value.length < 5 ? undefined : `${name}_IS_TOO_LONG`)


it('should call the right validator for each array value', () => {
  const validate = match([
    containsLetterA('VALUE_1'),
    hasLengthLessThan5('VALUE_2'),
    containsLetterA('VALUE_3'),
    hasLengthLessThan5('VALUE_4'),
  ])

  const values = ['Archibald', 'Richard', 'Steven', 'Matt']

  expect(validate(values)).toEqual([
    undefined,
    'VALUE_2_IS_TOO_LONG',
    'VALUE_3_HAS_NO_A',
    undefined,
  ])
})
