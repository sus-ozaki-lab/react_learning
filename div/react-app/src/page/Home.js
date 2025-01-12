// Home.js
import React, { useState } from "react";
import KeyTypeTabs from "../components/home/KeyTypeTabs";

const Home = () => {
  const labID = "尾崎研究室"; // 仮のログイン情報

  return (
    <div>
      <h1>研究室 鍵管理システム</h1>
      <KeyTypeTabs lab={labID} />
    </div>
  );
};

export default Home;
