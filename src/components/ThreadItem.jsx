import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { PiThumbsUp, PiThumbsDown, PiThumbsUpFill, PiThumbsDownFill, PiChat } from 'react-icons/pi';
import parser from 'html-react-parser';
import { postedAt } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
  authUser,
  upVote,
  downVote,
  neutralizeVote,
}) {
  const navigate = useNavigate();
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    if (isUpVoted) {
      neutralizeVote(id, isUpVoted);
    } else {
      upVote(id, isDownVoted);
    }
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    if (isDownVoted) {
      neutralizeVote(id, isUpVoted);
    } else {
      downVote(id, isUpVoted);
    }
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="thread-item"
      onClick={onThreadClick}
      onKeyDown={onThreadPress}
    >
      <img src={user.avatar} className="thread-item__avatar" alt="avatar" />
      <div className="thread-item__content">
        <div className="thread-item__owner">
          <b>{user.name}</b>
          <span>{user.email}</span>
        </div>
        <div className="thread-item__title">
          <Link to="/">{parser(title)}</Link>
        </div>
        <div className="categories-list">
          <button type="button" className="category-item">
            {`#${category}`}
          </button>
        </div>
        <div className="thread-item__body">{parser(body)}</div>
        <div className="thread-item__footer">
          <div className="thread-item__action">
            <p>
              <button type="button" aria-label="upvote" onClick={onUpVoteClick}>
                {isUpVoted ? <PiThumbsUpFill style={{ color: '#1dd1a1' }} /> : <PiThumbsUp />}
              </button>
              &nbsp;
              {upVotesBy.length}
            </p>
          </div>
          <div className="thread-item__action">
            <p>
              <button type="button" aria-label="downvote" onClick={onDownVoteClick}>
                {isDownVoted ? <PiThumbsDownFill style={{ color: '#ff6b81' }} /> : <PiThumbsDown />}
              </button>
              &nbsp;
              {downVotesBy.length}
            </p>
          </div>
          <div className="thread-item__action">
            <p>
              <button type="button" aria-label="like">
                <PiChat />
              </button>
              &nbsp;
              {totalComments}
            </p>
          </div>
          <p>{postedAt(createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export {
  threadItemShape,
};

export default ThreadItem;
