import originalBetween from './between'
import { errorMessageCreator, ERROR_MESSAGE } from '../utils/testUtils'
/* global test, it, expect */

const between = originalBetween({ messageCreator: errorMessageCreator })
const between0and100 = between({ min: 0, max: 100 })('some random field name')


test('min value -> OK', () => {
  expect(between0and100(0)).toBeUndefined()
})

test('value between -> OK', () => {
  expect(between0and100(50)).toBeUndefined()
})

test('max value -> OK', () => {
  expect(between0and100(100)).toBeUndefined()
})

test('undefined -> OK', () => {
  expect(between0and100()).toBeUndefined()
})

test('null -> OK', () => {
  expect(between0and100(null)).toBeUndefined()
})

test('numeric string with number between min and max -> OK', () => {
  expect(between0and100('0.0')).toBeUndefined()
})

test('smaller value -> error message', () => {
  expect(between0and100(-0.1)).toEqual(ERROR_MESSAGE)
})

test('larger value -> error message', () => {
  expect(between0and100(100.1)).toEqual(ERROR_MESSAGE)
})

test('alphanumeric value -> error message', () => {
  expect(between0and100('asdf1234')).toEqual(ERROR_MESSAGE)
})

test('array -> error message', () => {
  expect(between0and100([1, 'a'])).toEqual(ERROR_MESSAGE)
})

test('object -> error message', () => {
  expect(between0and100({ foo: 'bar' })).toEqual(ERROR_MESSAGE)
})
