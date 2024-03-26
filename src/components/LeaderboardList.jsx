import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem, { leaderboardItemShape } from './LeaderboardItem';

function LeaderboardList({ leaderboards }) {
  return (
    <>
      <h2>Klasemen Pengguna Aktif</h2>
      <div className="leaderboards-list">
        <div className="leaderboard-item__row">
          <div className="leaderboard-item__left"><b>Pengguna</b></div>
          <div className="leaderboard-item__right"><b>Skor</b></div>
        </div>
        {leaderboards.map((leaderboard) => (
          <LeaderboardItem key={leaderboard.user.id} {...leaderboard} />
        ))}
      </div>
    </>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardItemShape)).isRequired,
};

export default LeaderboardList;
