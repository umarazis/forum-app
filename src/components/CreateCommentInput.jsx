import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppButton from './AppButton';

function CreateCommentInput({ createComment }) {
  const [comment, setComment] = useState('');

  const createCommentHandler = () => {
    if (comment.trim()) {
      createComment(comment);
      setComment('');
    }
  };

  const handleCommentChange = ({ target }) => {
    if (target.value.length <= 255) {
      setComment(target.value);
    }
  };

  return (
    <div className="create-comment-input">
      <textarea type="text" value={comment} onChange={handleCommentChange} placeholder="Masukkan komentar kamu" />
      <p className="create-comment-input__length">
        <strong>{comment.length}</strong>
        /255
      </p>
      <AppButton
        title="Create Comment"
        type="primary"
        label="Kirim"
        onClick={createCommentHandler}
      />
    </div>
  );
}

CreateCommentInput.propTypes = {
  createComment: PropTypes.func.isRequired,
};

export default CreateCommentInput;
