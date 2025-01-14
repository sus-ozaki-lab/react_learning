import React, { useState } from "react";
import axios from "axios"; // axiosのインポート
import { useNavigate } from "react-router-dom"; // useNavigateのインポート
import ChangeLocationButton from "../components/home/ChangeLocationButton"; // 場所変更ボタンコンポーネント
import History from "../components/home/History"; // 履歴表示コンポーネント
import KeyTypeTabs from "../components/home/KeyTypeTabs"; // 鍵の種類タブコンポーネント

const Home = ({ lab, setLab }) => {
  const navigate = useNavigate();  // navigateの使用

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout"); // ログアウトリクエスト
      setLab(null); // labの状態をリセット
      navigate("/login"); // ログインページにリダイレクト
    } catch (err) {
      alert("ログアウトに失敗しました");
    }
  };

  return (
    <div>
      <h1>研究室 鍵管理システム</h1>
      
      {/* labが存在する場合のみ表示 */}
      {lab ? (
        <div>
          <KeyTypeTabs lab={lab} setLab={setLab} /> {/* 鍵の種類表示 */}
          <ChangeLocationButton /> {/* 場所変更ボタン */}
          <History lab={lab} /> {/* 履歴表示 */}

          {/* ログアウトボタン */}
          <button onClick={handleLogout}>ログアウト</button>
        </div>
      ) : (
        <div>
          <p>ログインしていません。再度ログインしてください。</p>
        </div>
      )}
    </div>
  );
};

export default Home;
