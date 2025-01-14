import React, { useState } from 'react';
import axios from 'axios';
import SelectPlace from "../components/keyplace/keyPlace";
import SelectType from "../components/keyplace/keyType";
import SubmitButton from "../components/keyplace/submitButton";

const KeyPlace = () => {
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const labID = "尾崎研究室";
  const handleSubmit = (event) => {
    event.preventDefault(); // デフォルトのフォーム送信を防止

    if (!selectedPlace || !selectedType) {
      alert('場所と種類を選択してください');
      return;
    }

    axios.post('http://localhost:5000/keyPlace/lab/submit', {
      place: selectedPlace,
      type: selectedType,
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
 
      <SelectPlace setSelectedPlace={setSelectedPlace}/>
      <SelectType setSelectedType={setSelectedType} lab={labID} />      
      <SubmitButton
        selectedPlace={selectedPlace}
        selectedType={selectedType}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default KeyPlace;
