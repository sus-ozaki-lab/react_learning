import React, { useState } from 'react';
import axios from 'axios';
import Show from "./components/page/kyePlace/Show";
import SelectPlace from "./components/page/kyePlace/selectPlace";
import SelectType from './components/page/kyePlace/SeleceType';
import SubmitButton from "./components/page/kyePlace/submit";


const App = () => {
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Place:',selectedPlace)
    console.log('Type:',selectedType)
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
      <Show />
      <SelectPlace setSelectedPlace={setSelectedPlace} />
      <SelectType setSelectedType={setSelectedType} />
      <SubmitButton
        selectedPlace={selectedPlace}
        selectedType={selectedType}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
