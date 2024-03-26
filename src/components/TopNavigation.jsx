import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import icon from '../assets/icon-square.png';

function TopNavigation({ authUser, toggleDropdown }) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/" className="app-icon">
              <img src={icon} className="app-icon__image" alt="icon" />
              <span>Stack.id</span>
            </Link>
          </li>
          <li>
            {authUser ? (
              <button type="button" onClick={() => toggleDropdown()} className="auth-user">
                <img src={authUser.avatar} className="auth-user__avatar" alt="avatar" />
                <span>{authUser.name}</span>
              </button>
            ) : (
              <Link to="/login" className="auth-user">
                <b className="auth-user__login">Log In</b>
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <div className="loading" />
    </>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

TopNavigation.propTypes = {
  authUser: PropTypes.shape(userShape),
  toggleDropdown: PropTypes.func.isRequired,
};

TopNavigation.defaultProps = {
  authUser: null,
};

export default TopNavigation;
