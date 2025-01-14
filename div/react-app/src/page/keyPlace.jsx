import React, { useState } from 'react';
import axios from 'axios';
import SelectPlace from "../components/keyplace/keyPlace";
import SelectType from "../components/keyplace/keyType";
import SubmitButton from "../components/keyplace/submitButton";

const KeyPlace = ({ lab }) => {
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // デフォルトのフォーム送信を防止

    // 場所と種類が選択されていない場合、アラートを表示
    if (!selectedPlace || !selectedType) {
      alert('場所と種類を選択してください');
      return;
    }
    const memberID = localStorage.getItem('memberID');  // localStorageからmemberIDを取得

    // labを含む動的なURLを作成
    axios.post(`http://localhost:5000/keyPlace/${lab}/submit`, {
      place: selectedPlace,
      type: selectedType,
      memberID: memberID,
    })
      .then(response => {
        console.log('Response from backend:', response.data);
        alert('データが送信されました');
      })
      .catch(error => {
        console.error('Error submitting data:', error);
        alert('データの送信に失敗しました');
      });
  };

  return (
    <div>
      <h1>鍵の管理システム</h1>
      {/* 場所選択コンポーネント */}
      <SelectPlace setSelectedPlace={setSelectedPlace} />
      
      {/* 種類選択コンポーネント */}
      <SelectType setSelectedType={setSelectedType} lab={lab} />      

      {/* 決定ボタン */}
      <SubmitButton
        selectedPlace={selectedPlace}
        selectedType={selectedType}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default KeyPlace;
