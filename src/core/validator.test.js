import validator from './validator'
import { ERROR_MESSAGE } from '../utils/testUtils'
/* global test, it, expect */

const validIfTrue = value => value

it('should build a validator that returns undefined when a given checker returns true', () => {
  const valueIsTrue = validator(validIfTrue, { messageCreator: () => ERROR_MESSAGE })(undefined)('some field name')

  expect(valueIsTrue(true)).toBeUndefined()
})

it('should build a validator that returns a given error message when a given checker returns false', () => {
  const valueIsTrue = validator(validIfTrue, { messageCreator: () => ERROR_MESSAGE })(undefined)('some field name')

  expect(valueIsTrue(false)).toEqual(ERROR_MESSAGE)
})

it('can be customized to show a given error message', () => {
  const valueIsTrue = validator(validIfTrue, { messageCreator: () => ERROR_MESSAGE })
  expect(valueIsTrue(/* param = */ undefined)('some field name')(false)).toEqual(ERROR_MESSAGE)

  const customConfig = { messageCreator: () => 'SOMETHING_ELSE' }
  expect(valueIsTrue(customConfig)(/* param = */ undefined)('some field name')(false)).toEqual('SOMETHING_ELSE')
})

it('can be customized to transform the given name into something different', () => {
  const valueIsTrue = validator(validIfTrue, { messageCreator: (param, name) => `${name} is invalid` })
  expect(valueIsTrue('some field name')(false)).toEqual('some field name is invalid')

  const customConfig = { nameTransformer: name => `${name} that was changed` }
  expect(valueIsTrue(customConfig)('some field name')(false)).toEqual('some field name that was changed is invalid')
})

test('param can be left away', () => {
  const valueIsTrue = validator(validIfTrue, { messageCreator: () => ERROR_MESSAGE })('some field name')

  expect(valueIsTrue(true)).toBeUndefined()
  expect(valueIsTrue(false)).toEqual(ERROR_MESSAGE)
})

test('param can not be left away when expectParameter is true', () => {
  const incorrectValueIsTrue = validator(validIfTrue, { messageCreator: () => ERROR_MESSAGE, expectParameter: true })('some field name')
  const correctValueIsTrue = validator(validIfTrue, { messageCreator: () => ERROR_MESSAGE, expectParameter: true })(undefined)('some field name')

  expect(incorrectValueIsTrue(false)).toBeInstanceOf(Function)
  expect(correctValueIsTrue(false)).toEqual(ERROR_MESSAGE)
})

test('Use message creator function instead of configuration object as the second parameter', () => {
  const validate = validator(() => false, () => 'is false')

  expect(validate('field')()).toEqual('is false')
})

it('should take allValues into account', () => {
  const validate = validator((value, param, allValues) => allValues.foo === value, () => ERROR_MESSAGE)

  expect(validate('Name')('bar', { foo: 'bar' })).toBeUndefined()
  expect(validate('Name')('bar', { foo: 'baz' })).toEqual(ERROR_MESSAGE)
})
