import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import AppButton from './AppButton';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <div className="input-login">
      <input
        type="email"
        id="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
      />
      <input
        type="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password"
      />
      <AppButton
        title="Login"
        label="Login"
        type="dark"
        onClick={onSubmitHandler}
      />
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
