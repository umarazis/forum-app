import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';
import icon from '../assets/icon-square.png';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <section className="register-page">
      <article className="register-page__box">
        <img src={icon} className="icon" alt="icon" />
        <h2>Register ke Stack.id</h2>
        <RegisterInput register={onRegister} />
        <p>
          Sudah punya akun?&nbsp;
          <Link to="/">Login di sini</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;
