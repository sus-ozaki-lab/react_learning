import React, { useState } from 'react';

const SelectPlace = ({ setSelectedPlace }) => {
  const [isCustom, setIsCustom] = useState(false); // 自由記述が選択されているかどうか
  const [customPlace, setCustomPlace] = useState(''); // 自由記述の場所

  // 初期値の選択肢
  const places = ["管理室", "変更者"];

  const handlePlaceChange = (event) => {
    setIsCustom(false); // 自由記述を無効化
    setCustomPlace(''); // 自由記述の内容をクリア
    setSelectedPlace(event.target.value); // 親コンポーネントに選択された場所を渡す
  };

  const handleCustomPlaceChange = (event) => {
    setIsCustom(true); // 自由記述を有効化
    const value = event.target.value;
    setCustomPlace(value); // 自由記述の値を更新
    setSelectedPlace(value); // 自由記述を選択状態に設定
  };

  return (
    <div>
      <h2>場所を選んでください</h2>
      <form>
        {/* 既存の選択肢を表示 */}
        {places.map((place, index) => (
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
        ))}

        {/* 自由記述用 */}
        <div>
          <input
            type="radio"
            id="custom-place"
            name="place"
            value="custom"
            checked={isCustom} // 自由記述が選択されている場合
            onChange={() => {
              setIsCustom(true); // 自由記述を有効化
              setSelectedPlace(customPlace); // 初期値を設定
            }}
          />
          <label htmlFor="custom-place">その他（自由記述）:</label>
          <input
            type="text"
            placeholder="場所を入力してください"
            value={customPlace}
            onChange={handleCustomPlaceChange}
            disabled={!isCustom} // 自由記述が選択されていない場合は無効化
          />
        </div>
      </form>
    </div>
  );
};

export default SelectPlace;