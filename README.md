# Valtors [![npm package](https://img.shields.io/npm/v/valtors.svg?style=flat-square)](https://www.npmjs.org/package/valtors)

**Valtors** is a small flexible extensible validation library for ES2015 classes based on [decorators](https://github.com/tc39/proposal-decorators).
Perfect worked with React/MobX form validation.

## React/MobX/Valtors Example

```javascript
// Store for react component

import { action, observable } from 'mobx';
import { email, required, validatable } from 'valtors';


@validatable('validationErrors')
class AuthCredentials {

  @required() @email()
  @observable username;

  @required('Password is required')
  @observable password;

  @observable validationErrors = { username: {}, password: {} };
}


export default AuthCredentials;



// React component

import React from 'react';
import PropTypes from 'prop-types';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import styles from './signin.css';
import AuthCredentials from '../../stores/AuthCredentials';


@inject('authCredentials')
@observer
class SignIn extends React.Component {

  static propTypes = {
    authCredentials: PropTypes.instanceOf(AuthCredentials).isRequired,
  };

  get store() { return this.props.authCredentials; }

  @action
  onSubmit = (e) => {
    e.preventDefault();

    // Validate all fields.
    if (!this.store.validate()) { return; }

    // If store is valid submit the form.
    // ...
  };

  @action
  onChange = (e) => {
    const { name, value } = e.target;
    store[name] = value;
    this.store.validate(name); // Validate only one field.
  }

  render() {
    const store = this.store;
    const errors = store.validationErrors;
    return (
        <div className={styles['container']}>
          <div className={styles['signin-box']}>
            <form onSubmit={this.onSubmit} noValidate>
              <input value={store.username} onChange={this.onChange} name="username" type="email" placeholder="email">
              <span className={errors.username.error ? styles['error'] : styles['hide']}>{errors.username.error}</span>

              <input value={store.password} onChange={this.onChange} name="password" type="password" placeholder="password">
              <span className={errors.password.error ? styles['error'] : styles['hide']}>{errors.password.error}</span>

              <button className={styles['btn-login']} type="submit">Login</button>
            </form>
          </div>
        </div>
    );
  }
}


export default SignIn;

```

## License

[MIT](https://opensource.org/licenses/mit-license.php)
