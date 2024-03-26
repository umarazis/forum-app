import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import AppButton from './AppButton';

function CreateThreadInput({ createThread }) {
  const [title, onTitleChange, setTitle] = useInput('');
  const [category, onCategoryChange, setCategory] = useInput('');
  const [body, onBodyChange, setBody] = useInput('');

  const createThreadHandler = () => {
    if (body.trim()) {
      createThread(title, body, category);
      setTitle('');
      setCategory('');
      setBody('');
    }
  };

  return (
    <div className="create-thread-input">
      <input
        type="text"
        id="title"
        value={title}
        onChange={onTitleChange}
        placeholder="Judul"
      />
      <input
        type="text"
        id="category"
        value={category}
        onChange={onCategoryChange}
        placeholder="Kategori"
      />
      <textarea
        type="text"
        value={body}
        placeholder="Isi thread kamu"
        className="create-thread-input__body"
        onChange={onBodyChange}
      />
      <AppButton
        title="Create Thread"
        label="Kirim"
        type="primary"
        onClick={createThreadHandler}
      />
    </div>
  );
}

CreateThreadInput.propTypes = {
  createThread: PropTypes.func.isRequired,
};

export default CreateThreadInput;
