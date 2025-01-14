import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitButton = ({ selectedPlace, selectedType, handleSubmit }) => {
  const navigate = useNavigate(); // useNavigate フック

  const handleClick = (event) => {
    // handleSubmit を先に実行（event を渡す）
    handleSubmit(event);
    
    // handleSubmit が成功した後に遷移
    navigate('/'); // トップページに遷移
  };

  return (
    <div>
      <button
        onClick={handleClick} // handleClick を使用
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
