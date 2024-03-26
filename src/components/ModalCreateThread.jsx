import React from 'react';
import PropTypes from 'prop-types';

function ModalCreateThread({ display, onToggleDisplayModal, children }) {
  return (
    <div id="modal-create-thread" className="modal" style={{ display }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Buat Thread</h3>
          <span
            className="close"
            onClick={onToggleDisplayModal}
            role="button"
            tabIndex={0}
            onKeyDown={onToggleDisplayModal}
          >
            &times;
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

ModalCreateThread.propTypes = {
  display: PropTypes.string.isRequired,
  onToggleDisplayModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalCreateThread;
