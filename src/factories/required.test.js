import originalRequired from './required'
import { errorMessageCreator, ERROR_MESSAGE } from '../utils/testUtils'
/* global it, expect */

const required = originalRequired({ messageCreator: errorMessageCreator })('field name')

it('should not return anything for a given string', () => {
  expect(required('some string')).toBeUndefined()
})

it('should not return anything for a given number', () => {
  expect(required(42)).toBeUndefined()
})

it('should not return anything for a given object', () => {
  expect(required({ foo: 'bar' })).toBeUndefined()
})

it('should not return anything for a given array', () => {
  expect(required(['foo', 'bar', 23])).toBeUndefined()
})

it('should return an error message for undefined', () => {
  expect(required()).toEqual(ERROR_MESSAGE)
})

it('should return an error message for null', () => {
  expect(required(null)).toEqual(ERROR_MESSAGE)
})

it('should return an error message for an empty string', () => {
  expect(required('')).toEqual(ERROR_MESSAGE)
})

it('should not return an error message for a blank string', () => {
  expect(required(' ')).toBeUndefined()
})
