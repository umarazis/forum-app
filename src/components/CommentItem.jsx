import React from 'react';
import PropTypes from 'prop-types';
import {
  PiThumbsUp,
  PiThumbsDown,
  PiThumbsUpFill,
  PiThumbsDownFill,
} from 'react-icons/pi';
import parser from 'html-react-parser';
import { postedAt } from '../utils';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upVote,
  downVote,
  neutralizeVote,
}) {
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

  return (
    <div className="comment-item">
      <img src={owner.avatar} className="comment-item__avatar" alt="avatar" />
      <div className="comment-item__content">
        <div className="comment-item__owner">
          <b>{owner.name}</b>
        </div>
        <div className="comment-item__body">{parser(content)}</div>
        <div className="comment-item__footer">
          <div className="comment-item__action">
            <p>
              <button type="button" aria-label="upvote" onClick={onUpVoteClick}>
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
          <div className="comment-item__action">
            <p>
              <button
                type="button"
                aria-label="downvote"
                onClick={onDownVoteClick}
              >
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
          <p>{postedAt(createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
};

CommentItem.propTypes = {
  ...commentItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export {
  commentItemShape,
};

export default CommentItem;
