import originalInteger from './isInteger'
import { errorMessageCreator, ERROR_MESSAGE } from '../utils/testUtils'
/* global test, it, expect */

const originalIntegerReturningTestErrorMessage = originalInteger({
  messageCreator: errorMessageCreator,
})
const isInteger = originalIntegerReturningTestErrorMessage('some random field name')

test('alphabetical value -> error message', () => {
  expect(isInteger('asdf')).toEqual(ERROR_MESSAGE)
  expect(isInteger('a')).toEqual(ERROR_MESSAGE)
})

test('blank value -> error message', () => {
  expect(isInteger(' ')).toEqual(ERROR_MESSAGE)
  expect(isInteger('  ')).toEqual(ERROR_MESSAGE)
  expect(isInteger('   ')).toEqual(ERROR_MESSAGE)
})

test('alphanumeric value -> error message', () => {
  expect(isInteger('abc123')).toEqual(ERROR_MESSAGE)
  expect(isInteger('123abc')).toEqual(ERROR_MESSAGE)
  expect(isInteger('a1')).toEqual(ERROR_MESSAGE)
  expect(isInteger('1a')).toEqual(ERROR_MESSAGE)
})

test('float value -> error message', () => {
  expect(isInteger(1.1)).toEqual(ERROR_MESSAGE)
  expect(isInteger(-1.1)).toEqual(ERROR_MESSAGE)
})

test('NaN -> error message', () => {
  expect(isInteger(NaN)).toEqual(ERROR_MESSAGE)
})

test('string with dot -> error message', () => {
  expect(isInteger('1.')).toEqual(ERROR_MESSAGE)
})

test('string with dot -> error message', () => {
  expect(isInteger('1.0')).toEqual(ERROR_MESSAGE)
})

test('integer string -> OK', () => {
  expect(isInteger('1')).toBeUndefined()
})

test('integer value -> OK', () => {
  expect(isInteger(1.000)).toBeUndefined()
  expect(isInteger(-1.000)).toBeUndefined()
})

test('integer value -> OK', () => {
  expect(isInteger(1000)).toBeUndefined()
  expect(isInteger(-1000)).toBeUndefined()
})

test('undefined -> OK', () => {
  expect(isInteger()).toBeUndefined()
})

test('null -> OK', () => {
  expect(isInteger(null)).toBeUndefined()
})
