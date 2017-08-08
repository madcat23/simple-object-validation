import { isValueEmpty, containsError } from './utils'
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

/* ########## containsError ########## */

test('find nested errors', () => {
  expect(containsError({})).toBe(false)
  expect(containsError({
    foo: {},
  })).toBe(false)
  expect(containsError({
    foo: [undefined],
  })).toBe(false)
  expect(containsError({
    foo: {
      bar: [undefined, undefined],
    },
  })).toBe(false)

  expect(containsError({ foo: 'foo' })).toBe(true)
  expect(containsError({
    foo: {
      bar: 'foo',
    },
  })).toBe(true)
  expect(containsError([undefined, 'foo'])).toBe(true)
  expect(containsError({
    foo: {
      bar: [undefined, 'foo'],
    },
  })).toBe(true)
})

/* ########## isValueNumeric ########## */
// TODO

/* ########## isValueAlphanumeric ########## */
// TODO
