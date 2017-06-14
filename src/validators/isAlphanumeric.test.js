import originalAlphanumeric from './isAlphanumeric'
import { errorMessageCreator, ERROR_MESSAGE } from '../utils/testUtils'
/* global test, it, expect */

const originalAlphanumericReturnningTestErrorMessage = originalAlphanumeric({
  messageCreator: errorMessageCreator,
})
const isAlphanumeric = originalAlphanumericReturnningTestErrorMessage('some random field name')


test('alphabetic value -> OK', () => {
  expect(isAlphanumeric('asdf')).toBeUndefined()
  expect(isAlphanumeric('a')).toBeUndefined()
})

test('numeric value -> OK', () => {
  expect(isAlphanumeric('1')).toBeUndefined()
  expect(isAlphanumeric(1)).toBeUndefined()
})

test('alphanumeric value -> OK', () => {
  expect(isAlphanumeric('abc123')).toBeUndefined()
  expect(isAlphanumeric('123abc')).toBeUndefined()
  expect(isAlphanumeric('a1')).toBeUndefined()
  expect(isAlphanumeric('1a')).toBeUndefined()
})

test('blank value -> error message', () => {
  expect(isAlphanumeric(' ')).toEqual(ERROR_MESSAGE)
  expect(isAlphanumeric('  ')).toEqual(ERROR_MESSAGE)
  expect(isAlphanumeric('   ')).toEqual(ERROR_MESSAGE)
})

test('NaN -> error message', () => {
  expect(isAlphanumeric(NaN)).toEqual(ERROR_MESSAGE)
})

test('positive integer value -> OK', () => {
  expect(isAlphanumeric(1000)).toBeUndefined()
})

test('negative integer value -> error message', () => {
  expect(isAlphanumeric(-1000)).toEqual(ERROR_MESSAGE)
})

test('float value -> error message', () => {
  expect(isAlphanumeric(1.001)).toEqual(ERROR_MESSAGE)
  expect(isAlphanumeric(-1.001)).toEqual(ERROR_MESSAGE)
})

test('undefined -> OK', () => {
  expect(isAlphanumeric()).toBeUndefined()
})

test('null -> OK', () => {
  expect(isAlphanumeric(null)).toBeUndefined()
})
