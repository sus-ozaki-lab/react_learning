import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Show = () => {
  const [places, setPlaces] = useState([]);  // 状態を配列で初期化

  useEffect(() => {
    // Flask APIからデータを取得
    axios.get('http://localhost:5000/keyPlace/lab/show')
      .then(response => {
        console.log('Fetched data:', response.data.message);  // 取得したデータを確認
        setPlaces(response.data.message);  // 取得したデータをステートに保存
      })
      .catch(error => {
        console.error('Error fetching data:', error);  // エラー時に表示
        setPlaces([]);
      });
  }, []);  // 空の依存配列で初回レンダリング時のみ実行

  return (
    <div>
      <h1>現在の鍵の場所</h1>
      {places.length > 0 ? (
        <div>
          {/* 取得した最新の鍵の場所を表示 */}
          <p>場所: {places[0].place}</p>
          <p>時間: {places[0].time}</p>
        </div>
      ) : (
        <p>データを読み込んでいます...</p>  // データが読み込まれるまでの表示
      )}
    </div>
  );
};

export default Show;
