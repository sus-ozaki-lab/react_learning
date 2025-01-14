// History.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const History = ({ lab }) => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/home/${lab}/history`
        );
        const data = response.data;

        // 履歴を最大10件に制限
        const limitedHistory = data.slice(0, 10);
        setHistory(limitedHistory);
        setError(null);
      } catch (err) {
        setError("履歴の取得中にエラーが発生しました");
      }
    };

    fetchHistory();
  }, [lab]);

  return (
    <div>
      <h2>履歴</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : history.length > 0 ? (
        <table border={1}>
          <thead>
            <tr>
              <th>更新日時</th>
              <th>更新者</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.time}</td>
                <td>{item.updatedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>履歴がありません</p>
      )}
    </div>
  );
};

export default History;
