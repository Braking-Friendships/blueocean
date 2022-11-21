import React from 'react';

const ChangeNameModal = ({ nameModal, setNameModal }) => {
  if (!nameModal) { return null }

  return (
    <div className="modal">
      CHANGE NAME
      <br />
      Select a username to change to

    </div>
  );
};

export default ChangeNameModal;
