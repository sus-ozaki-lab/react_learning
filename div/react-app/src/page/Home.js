// Home.js
import React, { useState } from "react";
import History from "../components/home/History";

const Home = () => {
  const labID = "尾崎研究室"; // 仮のログイン情報

  return (
    <div>
      <h1>研究室 鍵管理システム</h1>

      {/* 履歴表示 */}
      <History lab={labID} />
    </div>
  );
};

export default Home;
