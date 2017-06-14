import { isValueEmpty } from './utils'
/* global test, it, expect */

/* ########## isValueEmpty ########## */
test('null -> true', () => {
  expect(isValueEmpty(null)).toEqual(true)
})

test('undefined -> true', () => {
  expect(isValueEmpty()).toEqual(true)
})

test('empty string -> true', () => {
  expect(isValueEmpty('')).toEqual(true)
})

test('non-empty string -> false', () => {
  expect(isValueEmpty('foo')).toEqual(false)
})

test('empty object -> false', () => {
  expect(isValueEmpty({})).toEqual(false)
})


/* ########## isValueNumeric ########## */
// TODO

/* ########## isValueAlphanumeric ########## */
// TODO
