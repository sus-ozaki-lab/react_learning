import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectPlace = ({ setSelectedPlace }) => {
  const [places, setPlaces] = useState([]);
  const [isCustom, setIsCustom] = useState(false); // 自由記述を選択しているかどうか
  const [customPlace, setCustomPlace] = useState(''); // 自由記述の場所

  useEffect(() => {
    // APIから場所のデータを取得
    axios.get('http://localhost:5000/keyPlace/lab/selectPlace')
      .then(response => {
        if (response.data && Array.isArray(response.data.places)) {
          setPlaces(response.data.places);
        }
      })
      .catch(error => console.error('Error fetching places:', error));
  }, []);

  const handlePlaceChange = (event) => {
    setIsCustom(false); // 自由記述を無効化
    setSelectedPlace(event.target.value); // 選択された場所を親コンポーネントに渡す
  };

  const handleCustomPlaceChange = (event) => {
    setIsCustom(true); // 自由記述を有効化
    setCustomPlace(event.target.value); // 自由記述の場所を保存
    setSelectedPlace(event.target.value); // 自由記述を選択された場所として設定
  };

  return (
    <div>
      <h2>場所を選んでください</h2>
      <form>
        {places.length > 0 ? (
          places.map((place, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`place-${index}`}
                name="place"
                value={place}
                checked={!isCustom && customPlace === place} // 自由記述が選ばれていない場合にチェック
                onChange={handlePlaceChange}
              />
              <label htmlFor={`place-${index}`}>{place}</label>
            </div>
          ))
        ) : (
          <p>場所リストを読み込んでいます...</p>
        )}

        <div>
          <input
            type="radio"
            id="custom-place"
            name="place"
            value="custom"
            checked={isCustom} // 自由記述が選択されている場合
            onChange={() => {
              setIsCustom(true);
              setSelectedPlace(customPlace); // 自由記述を選択状態にする
            }}
          />
          <label htmlFor="custom-place">その他（自由記述）:</label>
          <input
            type="text"
            placeholder="場所を入力してください"
            value={customPlace}
            onChange={handleCustomPlaceChange}
          />
        </div>
      </form>
    </div>
  );
};

export default SelectPlace;
