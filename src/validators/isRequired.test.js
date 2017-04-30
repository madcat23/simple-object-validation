import originalRequired from './isRequired'
import { errorMessageCreator, ERROR_MESSAGE } from '../utils/testUtils'
/* global test, it, expect */

const required = originalRequired({ messageCreator: errorMessageCreator })('field name')

test('string -> OK', () => {
  expect(required('some string')).toBeUndefined()
})

test('number -> OK', () => {
  expect(required(42)).toBeUndefined()
})

test('object -> OK', () => {
  expect(required({ foo: 'bar' })).toBeUndefined()
})

test('array -> OK', () => {
  expect(required(['foo', 'bar', 23])).toBeUndefined()
})

test('undefined -> error message', () => {
  expect(required()).toEqual(ERROR_MESSAGE)
})

test('null -> error message', () => {
  expect(required(null)).toEqual(ERROR_MESSAGE)
})

test('empty string -> error message', () => {
  expect(required('')).toEqual(ERROR_MESSAGE)
})

test('blank string -> OK', () => {
  expect(required(' ')).toBeUndefined()
})
