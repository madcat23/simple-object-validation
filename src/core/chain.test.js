import chain from './chain'
/* global test, it, expect */


// eslint-disable-next-line no-unused-vars
const containsLetterA = name => value => (value.indexOf('a') > -1 || value.indexOf('A') > -1 ? undefined : `${name}_HAS_NO_A`)

// eslint-disable-next-line no-unused-vars
const hasLengthLessThan5 = name => value => (value.length < 5 ? undefined : `${name}_IS_TOO_LONG`)


it('should chain different validators and return the right error message for each case', () => {
  const validate = chain([
    containsLetterA,
    hasLengthLessThan5,
  ])('FIELD_NAME')

  expect(validate('Archibald')).toEqual('FIELD_NAME_IS_TOO_LONG')
  expect(validate('Rick')).toEqual('FIELD_NAME_HAS_NO_A')

  // Both validators fail but only the first message is returned:
  expect(validate('Steven')).toEqual('FIELD_NAME_HAS_NO_A')

  // The input is ok:
  expect(validate('Matt')).toBeUndefined()
})
