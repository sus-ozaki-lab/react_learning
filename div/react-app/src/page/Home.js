// Home.js
import React, { useState } from "react";
import ChangeLocationButton from "../components/home/ChangeLocationButton";
import History from "../components/home/History";
import KeyTypeTabs from "../components/home/KeyTypeTabs";

const Home = () => {
  const labID = "尾崎研究室"; // 仮のログイン情報

  return (
    <div>
      <h1>研究室 鍵管理システム</h1>
      <KeyTypeTabs lab={labID} />

      {/* 場所変更ボタン */}
      <ChangeLocationButton />

      {/* 履歴表示 */}
      <History lab={labID} />
    </div>
  );
};

export default Home;