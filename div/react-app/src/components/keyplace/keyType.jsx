import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SelectType = ({ setSelectedType, lab }) => {
  const [types, setTypes] = useState([]); // APIから取得する鍵の種類リスト
  const [selected, setSelected] = useState(''); // 選択された鍵の種類

  useEffect(() => {
    // Flask APIから鍵の種類を取得
    axios.get(`http://localhost:5000/keyPlace/${lab}/selectType`) // 修正点
      .then(response => {
        if (response.data && Array.isArray(response.data.types)) {
          setTypes(response.data.types); // 鍵の種類リストを保存
        } else {
          console.error('Invalid response structure:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching key types:', error); // エラー時にログを出力
      });
  }, [lab]); // labが変更されるたびに再度データを取得

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelected(selectedType); // ローカルの選択状態を更新
    setSelectedType(selectedType); // 親コンポーネントに選択された値を渡す
  };

  return (
    <div>
      <h2>鍵の種類を選んでください</h2>
      {types.length > 0 ? (
        <form>
          {types.map((type, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`type-${index}`}
                name="type"
                value={type}
                checked={selected === type}
                onChange={handleTypeChange}
              />
              <label htmlFor={`type-${index}`}>{type}</label>
            </div>
          ))}
        </form>
      ) : (
        <p>データを読み込んでいます...</p> // データが読み込まれるまでの表示
      )}
    </div>
  );
};

export default SelectType;
