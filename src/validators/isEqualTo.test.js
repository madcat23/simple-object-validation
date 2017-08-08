import isEqualTo from './isEqualTo'
/* global test, it, expect */

test('equal value => undefined, not equal value => error', () => {
  const allValues = {
    foo: 'foo',
    bar: {
      baz: 'foo',
    },
  }

  expect(isEqualTo({ value: values => values.bar.baz, name: 'Bar' })('Foo')('foo', allValues)).toBeUndefined()
  expect(isEqualTo({ value: values => values.bar.baz, name: 'Bar' })('Foo')('__foo__', allValues)).toEqual('Foo must be equal to Bar.')

  const allValues2 = {
    foo: 'foo',
    bar: 'foo',
  }

  expect(isEqualTo({ property: 'bar', name: 'Bar' })('Foo')('foo', allValues2)).toBeUndefined()
  expect(isEqualTo({ property: 'bar', name: 'Bar' })('Foo')('__foo__', allValues2)).toEqual('Foo must be equal to Bar.')
  expect(isEqualTo({ property: '__bar__', name: 'Bar' })('Foo')('foo', allValues2)).toEqual('Foo must be equal to Bar.')
})

test('undefined, null, empty string => no problem', () => {
  const isFooEqualToBar = isEqualTo({ property: 'bar', name: 'Bar' })('Foo')

  const allValues1 = {
    foo: '',
  }

  expect(isFooEqualToBar(allValues1.foo, allValues1)).toBeUndefined()

  const allValues2 = {
    foo: '',
    bar: null,
  }

  expect(isFooEqualToBar(allValues2.foo, allValues2)).toBeUndefined()

  const allValues3 = {
    bar: null,
  }

  expect(isFooEqualToBar(allValues3.foo, allValues3)).toBeUndefined()

  const allValues4 = {
    bar: '',
  }

  expect(isFooEqualToBar(allValues4.foo, allValues4)).toBeUndefined()

  const allValues5 = {
    bar: '',
    foo: null,
  }

  expect(isFooEqualToBar(allValues5.foo, allValues5)).toBeUndefined()

  const allValues6 = {
    foo: null,
  }

  expect(isFooEqualToBar(allValues6.foo, allValues6)).toBeUndefined()
})

test('Handle missing name', () => {
  const allValues = {
    password: '12345',
    repeatPassword: '1234',
  }


  const result1 = isEqualTo({ property: 'password' })('Repeat password')(allValues.repeatPassword, allValues)
  expect(result1).toEqual('The values must be equal.')


  const customIsEqualTo = isEqualTo({
    messageCreator: () => 'Passwords must be equal.',
  })
  const result2 = customIsEqualTo({ property: 'password' })('Repeat password')(allValues.repeatPassword, allValues)
  expect(result2).toEqual('Passwords must be equal.')
})
