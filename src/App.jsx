import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import TopNavigation from './components/TopNavigation';
import Loading from './components/Loading';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import 'react-toastify/dist/ReactToastify.css';
import AppButton from './components/AppButton';

function App() {
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);
  const [display, setDisplay] = useState('none');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onToggleDropdown = () => {
    if (display === 'none') {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
  };

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
    setDisplay('none');
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <main>
          <Loading />
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <ToastContainer autoClose={2000} />
      </>
    );
  }

  return (
    <>
      <Loading />
      <header>
        <TopNavigation authUser={authUser} toggleDropdown={onToggleDropdown} />
      </header>
      <main className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
        </Routes>
      </main>
      <div className="dropdown" style={{ display }}>
        <div className="user-dropdown">
          <img src={authUser.avatar} className="auth-user__avatar" alt="avatar" />
          <div className="user-dropdown__name">{authUser.name}</div>
          <div className="user-dropdown__email">{authUser.email}</div>
          <AppButton
            title="Sign Out"
            label="Sign Out"
            onClick={() => onSignOut()}
            type="secondary"
          />
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
