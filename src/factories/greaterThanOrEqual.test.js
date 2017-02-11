import greaterThanOrEqual from './greaterThanOrEqual'
import { errorMessageCreator, ERROR_MESSAGE } from '../utils/testUtils'
/* global test, it, expect */

const greaterThanOrEqualReturningTestErrorMessage = greaterThanOrEqual(errorMessageCreator)
const greaterThanOrEqual10 = greaterThanOrEqualReturningTestErrorMessage(10)('some random field name')


test('smaller value -> error message', () => {
  expect(greaterThanOrEqual10(-1000000)).toEqual(ERROR_MESSAGE)
  expect(greaterThanOrEqual10(9)).toEqual(ERROR_MESSAGE)
})

test('minimal value -> undefined', () => {
  expect(greaterThanOrEqual10(10)).toBeUndefined()
})

test('greater value -> undefined', () => {
  expect(greaterThanOrEqual10(11)).toBeUndefined()
  expect(greaterThanOrEqual10(1000000)).toBeUndefined()
})

test('undefined -> undefined', () => {
  expect(greaterThanOrEqual10()).toBeUndefined()
})

test('null -> undefined', () => {
  expect(greaterThanOrEqual10(null)).toBeUndefined()
})

test('alphanumeric value -> error message', () => {
  expect(greaterThanOrEqual10('a')).toEqual(ERROR_MESSAGE)
})
