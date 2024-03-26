import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ user, score }) {
  return (
    <div className="leaderboard-item__row">
      <div className="leaderboard-item__left">
        <img src={user.avatar} className="leaderboard-item__avatar" alt="avatar" />
        <div>
          <div className="leaderboard-item__name">{user.name}</div>
          <div className="leaderboard-item__email">{user.email}</div>
        </div>
      </div>
      <div className="leaderboard-item__right">{score}</div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const leaderboardItemShape = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};

LeaderboardItem.propTypes = {
  ...leaderboardItemShape,
};

export {
  leaderboardItemShape,
};

export default LeaderboardItem;
