import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import LeaderboardList from '../components/LeaderboardList';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import ActionButton from '../components/ActionButton';

function LeaderboardsPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  if (!leaderboards) {
    return null;
  }

  return (
    <>
      <section className="main-container card leaderboards-page">
        <LeaderboardList leaderboards={leaderboards} />
      </section>
      <div className="action-button-list">
        <ActionButton
          title="Buat Thread"
          onClick={() => navigate('/')}
          icon={<FaHome />}
          type="primary"
        />
      </div>
    </>
  );
}

export default LeaderboardsPage;
