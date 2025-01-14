import React, { useEffect, useState } from "react";
import axios from "axios";

const History = ({ lab }) => {
  const [history, setHistory] = useState([]);  // 履歴データ
  const [error, setError] = useState(null);     // エラーメッセージ

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // labが渡されていない場合はエラーメッセージを表示
        if (!lab) {
          setError("研究室名が指定されていません。");
          return;
        }

        // 履歴データをAPIから取得
        const response = await axios.get(
          `http://localhost:5000/home/${encodeURIComponent(lab)}/history`
        );
        
        const data = response.data;
        
        // 履歴データが取得できた場合
        if (data && Array.isArray(data)) {
          setHistory(data);
          setError(null); // エラーメッセージをリセット
        } else {
          setError("履歴が見つかりませんでした");
        }
      } catch (err) {
        // エラーハンドリング
        setError("履歴の取得中にエラーが発生しました");
      }
    };

    fetchHistory(); // 履歴取得を実行
  }, [lab]); // labが変更されるたびに再実行

  return (
    <div>
      <h2>履歴</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p> // エラーがあれば表示
      ) : history.length > 0 ? (
        <table border={1}>
          <thead>
            <tr>
              <th>更新日時</th>
              <th>更新者</th>
              <th>場所</th>
              <th>鍵の種類</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.time}</td>
                <td>{item.updatedBy}</td>
                <td>{item.place}</td>
                <td>{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>履歴がありません</p> // 履歴がない場合
      )}
    </div>
  );
};

export default History;
