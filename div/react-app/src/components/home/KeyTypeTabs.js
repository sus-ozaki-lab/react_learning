import React, { useState, useEffect } from "react";
import axios from "axios";
import WantKeyButton from "./WantKeyButton";

function KeyTypeTabs({ lab }) {
  const [keys, setKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [keyDetails, setKeyDetails] = useState(null);
  const [error, setError] = useState(null);

  // 鍵の種類を取得
  useEffect(() => {
    axios
      .get(`http://localhost:5000/home/${encodeURIComponent(lab)}/keyType`)
      .then((response) => {
        setKeys(response.data);
        setError(null); // 成功時はエラーをリセット
      })
      .catch((error) => {
        setError("鍵の種類を取得できません: " + error.message);
        console.error("鍵の種類を取得できません:", error);
      });
  }, [lab]);

  // 鍵を選択したときの処理
  const handleKeySelect = (keyID) => {
    setSelectedKey(keyID);
    axios
      .get(`http://localhost:5000/home/${encodeURIComponent(lab)}/place?keyID=${keyID}`)
      .then((response) => setKeyDetails(response.data))
      .catch((error) => {
        setError("鍵の詳細を取得できません: " + error.message);
        console.error("鍵の詳細を取得できません:", error);
      });
  };

  return (
    <div>
      <h1>鍵の種類</h1>

      {/* 鍵の種類の表示 */}
      <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
        {keys.map((key) => (
          <div
            key={key.keyID}
            onClick={() => handleKeySelect(key.keyID)}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              borderBottom:
                selectedKey === key.keyID ? "2px solid blue" : "none",
              backgroundColor:
                selectedKey === key.keyID ? "#f0f8ff" : "transparent",
            }}
          >
            {key.type}
          </div>
        ))}
      </div>

      {/* エラーメッセージの表示 */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 鍵の詳細表示 */}
      <div style={{ marginTop: "20px" }}>
        {selectedKey === null ? (
          <p>鍵を選択してください。</p>
        ) : keyDetails ? (
          <div>
            <p>現在の場所: {keyDetails.place}</p>
            <p>最終更新者: {keyDetails.memberName}</p>
            <p>最終更新時間: {keyDetails.time}</p>
            {/* WantKeyButton コンポーネントを使用 */}
            <WantKeyButton lab={lab} selectedKey={selectedKey} />
          </div>
        ) : (
          <p>鍵の詳細を取得できません。</p>
        )}
      </div>
    </div>
  );
}

export default KeyTypeTabs;