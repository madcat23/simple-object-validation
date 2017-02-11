import lessThanOrEqual from './lessThanOrEqual'
import { errorMessageCreator, ERROR_MESSAGE } from '../utils/testUtils'
/* global test, it, expect */

const lessThanOrEqualReturningTestErrorMessage = lessThanOrEqual(errorMessageCreator)
const lessThanOrEqual10 = lessThanOrEqualReturningTestErrorMessage(10)('some random field name')


test('too large value -> error message', () => {
  expect(lessThanOrEqual10(11)).toEqual(ERROR_MESSAGE)
  expect(lessThanOrEqual10(1000000)).toEqual(ERROR_MESSAGE)
})

test('maximal value -> undefined', () => {
  expect(lessThanOrEqual10(10)).toBeUndefined()
})

test('smaller value -> undefined', () => {
  expect(lessThanOrEqual10(9)).toBeUndefined()
  expect(lessThanOrEqual10(-1000000)).toBeUndefined()
})

test('undefined -> undefined', () => {
  expect(lessThanOrEqual10()).toBeUndefined()
})

test('null -> undefined', () => {
  expect(lessThanOrEqual10(null)).toBeUndefined()
})
