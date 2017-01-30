import required from './required'
/* global it, expect */

const isRequired = required()('field name')

it('should not return anything for a given string', () => {
  expect(isRequired('some string')).toBeUndefined()
})

it('should not return anything for a given number', () => {
  expect(isRequired(42)).toBeUndefined()
})

it('should not return anything for a given object', () => {
  expect(isRequired({ foo: 'bar' })).toBeUndefined()
})

it('should not return anything for a given array', () => {
  expect(isRequired(['foo', 'bar', 23])).toBeUndefined()
})

it('should return an error message for undefined', () => {
  expect(isRequired()).toContain('') // returns some error message
})

it('should return an error message for null', () => {
  expect(isRequired(null)).toContain('') // returns some error message
})
