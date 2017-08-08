import assemble from './assemble'
import { ERROR_MESSAGE } from '../utils/testUtils'
/* global it, expect */

/*
 * Using a simple validator function that cannot be parameterized
 * to be independent of arbitrary validator implementations and just focus
 * on testing the assemble function
 */
const required = value => (!value ? ERROR_MESSAGE : undefined)


it('should produce correctly assembled error objects', () => {
  const validate = assemble({
    name: required,
    permissions: assemble({
      create: required,
    }),
  })

  const value = {
    name: '',
    permissions: {},
  }

  expect(validate(value)).toEqual({
    name: ERROR_MESSAGE,
    permissions: {
      create: ERROR_MESSAGE,
    },
  })
})

it('should return an empty object for a valid value object', () => {
  const validate = assemble({
    name: required,
    permissions: assemble({
      create: required,
    }),
  })

  const value = {
    name: 'Matthias',
    permissions: {
      create: true,
    },
  }

  expect(validate(value)).toEqual({})
})

it('should validate missing nested values and return error messages for them', () => {
  const validate = assemble({
    name: required,
    age: required,
    permissions: assemble({
      create: required,
    }),
  })

  const value = {
    name: 'Matthias',
    /*
     * no permissions object here, but the create property should be validated
     * and the assembled validator function should return an error message as
     * it is missing.
     */
  }

  expect(validate(value)).toEqual({
    age: ERROR_MESSAGE,
    permissions: { create: ERROR_MESSAGE },
  })
})

it('should ignore missing nested values when configured to do so', () => {
  const validate = assemble({
    name: required,
    age: required,
    permissions: assemble({
      create: required,
    },
    { ignoreIfMissing: true }),
  })

  const value = {
    name: 'Matthias',
  }

  expect(validate(value)).toEqual({
    age: ERROR_MESSAGE,
  })
})

it('should apply given reducers', () => {
  const emailIsEqualToRepeatedEmail = (value, result) => {
    if (value.email !== value.repeatEmail) {
      return { ...result, repeatEmail: ERROR_MESSAGE }
    }
    return result
  }

  const validate = assemble(
    {
      name: required,
      age: required,
    },
    emailIsEqualToRepeatedEmail
  )

  expect(validate({ name: 'Matthias' })).toEqual({
    age: ERROR_MESSAGE,
  })

  expect(validate({ name: 'Matthias', email: 'foo@bar.com' })).toEqual({
    age: ERROR_MESSAGE,
    repeatEmail: ERROR_MESSAGE,
  })

  expect(validate({ name: 'Matthias', email: 'foo@bar.com', repeatEmail: 'bar@foo.com' })).toEqual({
    age: ERROR_MESSAGE,
    repeatEmail: ERROR_MESSAGE,
  })

  expect(validate({ name: 'Matthias', email: 'foo@bar.com', repeatEmail: 'foo@bar.com' })).toEqual({
    age: ERROR_MESSAGE,
  })
})

it('should propagate allValues to every validator', () => {
  const isEqualToFoo = (value, allValues) => (allValues.foo !== value ? ERROR_MESSAGE: undefined)

  const validate = assemble({
    foo: required,
    bar: assemble({
      baz: isEqualToFoo,
    }),
  })

  expect(validate({ foo: 'foobar', bar: { baz: 'foobar' } })).toEqual({})
})

it('should check for unknown properties correctly', () => {
  // Will it throw an error?
  const validateDisallowingUnknownProperties = assemble({
    foo: required,
    bar: required,
  }, { strictValidation: true })

  expect(() => validateDisallowingUnknownProperties({ foo: 'foo', bar: 'bar' })).not.toThrow()
  expect(() => validateDisallowingUnknownProperties({ foo: 'foo', bar: 'bar', baz: 'baz' })).toThrow('No validator found for baz')


  // Whitelist
  const validateWhitelistingProperties = assemble({
    foo: required,
    bar: required,
  }, { strictValidation: true, whitelist: ['baz'] })

  expect(() => validateWhitelistingProperties({ foo: 'foo', bar: 'bar', baz: 'baz' })).not.toThrow()
  expect(() => validateWhitelistingProperties({ foo: 'foo', bar: 'bar', baz: 'baz', boom: 'boom' })).toThrow('No validator found for boom')


  // Normal call with unknown property
  const validateAllowingUnknownProperties = assemble({
    foo: required,
    bar: required,
  })

  expect(() => validateAllowingUnknownProperties({ foo: 'foo', bar: 'bar' })).not.toThrow()
  expect(() => validateAllowingUnknownProperties({ foo: 'foo', bar: 'bar', baz: 'baz' })).not.toThrow()
})
