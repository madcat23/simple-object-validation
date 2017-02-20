import originalGreaterThanOrEqual from './greaterThanOrEqual'
import { errorMessageCreator, ERROR_MESSAGE } from '../utils/testUtils'
/* global test, it, expect */

const greaterThanOrEqual = originalGreaterThanOrEqual({ messageCreator: errorMessageCreator })
const greaterThanOrEqual10 = greaterThanOrEqual(10)('some random field name')


test('smaller value -> error message', () => {
  expect(greaterThanOrEqual10(-1000000)).toEqual(ERROR_MESSAGE)
  expect(greaterThanOrEqual10(9)).toEqual(ERROR_MESSAGE)
})

test('minimal value -> OK', () => {
  expect(greaterThanOrEqual10(10)).toBeUndefined()
})

test('greater value -> OK', () => {
  expect(greaterThanOrEqual10(11)).toBeUndefined()
  expect(greaterThanOrEqual10(1000000)).toBeUndefined()
})

test('undefined -> OK', () => {
  expect(greaterThanOrEqual10()).toBeUndefined()
})

test('null -> OK', () => {
  expect(greaterThanOrEqual10(null)).toBeUndefined()
})

test('alphanumeric value -> error message', () => {
  expect(greaterThanOrEqual10('a')).toEqual(ERROR_MESSAGE)
})
