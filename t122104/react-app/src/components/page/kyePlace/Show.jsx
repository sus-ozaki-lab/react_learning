import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Show = () => {
  const [data, setData] = useState([]); // 鍵情報を保持
  const [loading, setLoading] = useState(true); // ローディング状態
  const [error, setError] = useState(null); // エラーメッセージ用

  useEffect(() => {
    // 全種類の鍵情報を取得
    axios.get('http://localhost:5000/keyPlace/lab/show')
      .then(response => {
        console.log('Fetched data:', response.data); // データを確認
        setData(response.data); // データを保存
      })
      .catch(error => {
        console.error('Error fetching data:', error); // エラー時に表示
        setError("データの取得に失敗しました。"); // エラーメッセージ
        setData([]); // エラー時にはデータを空にする
      })
      .finally(() => {
        setLoading(false); // ローディング状態を終了
      });
  }, []); // 初回のみ実行

  return (
    <div>
      <h1>全種類の鍵の場所</h1>
      {loading ? (
        <p>データを読み込んでいます...</p> // ローディング中
      ) : error ? (
        <p>{error}</p> // エラーメッセージ表示
      ) : data.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>鍵の種類</th>
              <th>場所</th>
              <th>変更者</th>
              <th>時間</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.type}</td>
                <td>{row.place}</td>
                <td>{row.memberName}</td>
                <td>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>データが見つかりません。</p> // データがない場合
      )}
    </div>
  );
};

export default Show;
