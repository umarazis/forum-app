import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';
import icon from '../assets/icon-square.png';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <article className="login-page__box">
        <img src={icon} className="icon" alt="icon" />
        <h2>Login ke Stack.id</h2>
        <LoginInput login={onLogin} />
        <p>
          Belum punya akun?&nbsp;
          <Link to="/register">Daftar di sini</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
