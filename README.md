<img src="https://raw.githubusercontent.com/madcat23/simple-object-validation/master/logo/logo.png" width="200" alt="simple-object-validation">

# simple object validation
simple-object-validation is a lightweight validation library that enables a functional way of validating javascript objects. It is made to work well with **Redux Form's validation API**.

## Code over configuration
The idea is to use only functions and no constraint configuration or something like that. Typically in a more sophisticated web application user input validation can easily become very complex and specific. So there will be the need of writing custom validation code. You should always be able to easily plug your custom code into the standard library code without having to configure and register stuff intransparently somewhere else.

[API Docs](https://madcat23.github.io/simple-object-validation/)

# Examples

## Simple registration form

```javascript
import { assemble, chain, isRequired, isInteger, isGreaterThanOrEqual } from 'simple-object-validation'

const isValidCustomer = assemble({
  name: isRequired('Name'),
  age: chain([
    isRequired,
    isInteger,
    isGreaterThanOrEqual(18)
  ])('Age'),
})

isValidCustomer({
  age: 17,
})
// { name: 'Name is required.', age: 'Age must be greater than or equal 18.' }

isValidCustomer({
  name: 'Mathew',
  age: 18,
})
// {}
```

## Integrate with Redux Form

```javascript
import { reduxForm } from 'redux-form'
import isValidCustomer from './validators/is-valid-customer' // see code above

class CustomerRegistrationComponent extends Component {
  /* ... contains redux form fields for customer, e. g. name, age and email */ 
}

export default reduxForm({
  form: 'customerRegistrationForm',
  validate: isValidCustomer,
})(CustomerRegistrationComponent)
```
See detailed information on how to use Redux Form's validation API at http://redux-form.com > Examples
