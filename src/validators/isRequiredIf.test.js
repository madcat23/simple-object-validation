import isRequiredIf from './isRequiredIf'
/* global test, it, expect */

test('string -> OK', () => {
  const validate = isRequiredIf(values => values.otherValue === 'foo')('Field')

  const values = {
    foo: 'bar',
    otherValue: 'foo',
  }

  expect(validate('bar', values)).toBeUndefined()

  const values2 = {
    foo: 'bar',
    otherValue: 'bar',
  }
  expect(validate('bar', values2)).toEqual('Field is required.')
})
