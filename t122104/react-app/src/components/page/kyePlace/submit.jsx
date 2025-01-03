import React from 'react';

const SubmitButton = ({ selectedPlace, selectedType, handleSubmit }) => {
  return (
    <div>
      <button onClick={handleSubmit}>送信</button>
      <p>選択した場所: {selectedPlace}</p>
      <p>選択した種類: {selectedType}</p>
    </div>
  );
};

export default SubmitButton;
