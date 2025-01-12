// Home.js
import React, { useState } from "react";
import ChangeLocationButton from "../components/home/ChangeLocationButton";

const Home = () => {
  const labID = "尾崎研究室"; // 仮のログイン情報

  return (
    <div>
      <h1>研究室 鍵管理システム</h1>

      {/* 場所変更ボタン */}
      <ChangeLocationButton />
    </div>
  );
};

export default Home;
