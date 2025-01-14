// WantKeyButton.js
import React from "react";
import axios from "axios";

function WantKeyButton({ lab, selectedKey }) {
  const handleWantKey = () => {
    axios
      .get(`http://localhost:5000/home/${lab}/wantKey/${selectedKey}`)
      .then((response) => {
        alert(response.data.message); // 成功時のメッセージを表示
      })
      .catch((error) => {
        console.error("鍵ほしい通知の送信に失敗しました:", error);
        alert("通知を送信できませんでした。");
      });
  };

  return <button onClick={handleWantKey}>鍵がほしい</button>;
}

export default WantKeyButton;
