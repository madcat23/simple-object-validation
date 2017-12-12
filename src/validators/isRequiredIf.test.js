import isRequiredIf from './isRequiredIf'
/* global test, it, expect */

test('required if', () => {
  const validate = isRequiredIf(values => values.otherValue === 'foo')('Field')

  const values = {
    foo: 'bar',
    otherValue: 'foo',
  }

  expect(validate('bar', values)).toBeUndefined()
  expect(validate('', values)).toEqual('Field is required.')

  const values2 = {
    foo: 'bar',
    otherValue: 'fooXXX',
  }

  expect(validate('bar', values2)).toBeUndefined()
  expect(validate('', values2)).toBeUndefined()
})
