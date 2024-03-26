import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import useInput from '../hooks/useInput';
import AppButton from './AppButton';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password.length < 6) {
      toast.warn('Password harus lebih dari 6 karakter');
    } else if (password !== confirmPassword) {
      toast.warn('Password dan confirm password harus sama');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className="input-register">
      <input
        type="text"
        id="name"
        value={name}
        onChange={onNameChange}
        placeholder="Name"
      />
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
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        placeholder="Confirm Password"
      />
      <AppButton
        title="Register"
        label="Register"
        type="dark"
        onClick={onSubmitHandler}
      />
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
