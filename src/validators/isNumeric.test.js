import originalNumeric from './isNumeric'
import { errorMessageCreator, ERROR_MESSAGE } from '../utils/testUtils'
/* global test, it, expect */

const numeric = originalNumeric({ messageCreator: errorMessageCreator })
const isNumeric = numeric('some random field name')


test('alphabetical value -> error message', () => {
  expect(isNumeric('asdf')).toEqual(ERROR_MESSAGE)
  expect(isNumeric('a')).toEqual(ERROR_MESSAGE)
})

test('blank value -> error message', () => {
  expect(isNumeric(' ')).toEqual(ERROR_MESSAGE)
  expect(isNumeric('  ')).toEqual(ERROR_MESSAGE)
  expect(isNumeric('   ')).toEqual(ERROR_MESSAGE)
})

test('alphanumeric value -> error message', () => {
  expect(isNumeric('abc123')).toEqual(ERROR_MESSAGE)
  expect(isNumeric('123abc')).toEqual(ERROR_MESSAGE)
  expect(isNumeric('a1')).toEqual(ERROR_MESSAGE)
  expect(isNumeric('1a')).toEqual(ERROR_MESSAGE)
})

test('NaN -> error message', () => {
  expect(isNumeric(NaN)).toEqual(ERROR_MESSAGE)
})

test('integer value -> OK', () => {
  expect(isNumeric(1000)).toBeUndefined()
  expect(isNumeric(-1000)).toBeUndefined()
})

test('float value -> OK', () => {
  expect(isNumeric(1.001)).toBeUndefined()
  expect(isNumeric(-1.001)).toBeUndefined()
})

test('undefined -> OK', () => {
  expect(isNumeric()).toBeUndefined()
})

test('null -> OK', () => {
  expect(isNumeric(null)).toBeUndefined()
})
