import React from 'react';
import PropTypes from 'prop-types';
import {
  PiThumbsUp,
  PiThumbsDown,
  PiThumbsUpFill,
  PiThumbsDownFill,
  PiChat,
} from 'react-icons/pi';
import parser from 'html-react-parser';
import { postedAt } from '../utils';

function ThreadDetail({
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upVote,
  downVote,
  neutralizeVote,
  totalComments,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    if (isUpVoted) {
      neutralizeVote(isUpVoted);
    } else {
      upVote(isDownVoted);
    }
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    if (isDownVoted) {
      neutralizeVote(isUpVoted);
    } else {
      downVote(isUpVoted);
    }
  };

  return (
    <div className="thread-detail">
      <div className="thread-detail__header">
        <img src={owner.avatar} className="thread-item__avatar" alt="avatar" />
        <div className="thread-detail__owner">
          <b>{owner.name}</b>
        </div>
      </div>
      <div className="thread-detail__content">
        <div className="categories-list">
          <button type="button" className="category-item">
            {`#${category}`}
          </button>
        </div>
        <div className="thread-detail__title">{parser(title)}</div>
        <div className="thread-detail__body">{parser(body)}</div>
      </div>
      <div className="thread-item__footer">
        <div className="thread-item__action">
          <p>
            <button type="button" aria-label="like" onClick={onUpVoteClick}>
              {isUpVoted ? (
                <PiThumbsUpFill style={{ color: '#1dd1a1' }} />
              ) : (
                <PiThumbsUp />
              )}
            </button>
            &nbsp;
            {upVotesBy.length}
          </p>
        </div>
        <div className="thread-item__action">
          <p>
            <button type="button" aria-label="like" onClick={onDownVoteClick}>
              {isDownVoted ? (
                <PiThumbsDownFill style={{ color: '#ff6b81' }} />
              ) : (
                <PiThumbsDown />
              )}
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
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadDetailShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadDetail.propTypes = {
  ...threadDetailShape,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  totalComments: PropTypes.string.isRequired,
};

export default ThreadDetail;
