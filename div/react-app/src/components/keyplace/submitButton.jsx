import React from 'react';

const SubmitButton = ({ selectedPlace, selectedType, handleSubmit }) => {
  return (
    <div>
      <button
        onClick={handleSubmit}
        disabled={!selectedPlace || !selectedType} // 場所と種類が選択されていない場合はボタンを無効化
      >
        決定
      </button>
      <p>選択された場所: {selectedPlace}</p>
      <p>選択された種類: {selectedType}</p>
    </div>
  );
};

export default SubmitButton;
