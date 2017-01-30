import maxValue from './max-value'
/* global it, expect */

const maxValue10 = maxValue(10)('field name')

it('should return an error message for a too large value', () => {
  expect(maxValue10(11)).toContain('') // returns some error message
})

it('should not return anything for a maximal value', () => {
  expect(maxValue10(10)).toBeUndefined()
})

it('should not return anything for a smaller value', () => {
  expect(maxValue10(5)).toBeUndefined()
})

// Should it throw an exception???
it('should throw an exception for undefined', () => {
  expect(maxValue10()).toThrowError()
})

// Should it throw an exception???
it('should throw an exception for null', () => {
  expect(maxValue10(null)).toThrowError()
})
