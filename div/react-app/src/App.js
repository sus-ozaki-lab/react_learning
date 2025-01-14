import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./page/Home";
import LoginPage from "./page/LoginPage";
import KeyPlace from "./page/keyPlace";

function App() {
  const [lab, setLab] = useState(null);  // lab情報をここで管理

  
  return (
    <Router>
      <Routes>
        {/* ログインページ */}
        <Route path="/login" element={<LoginPage setLab={setLab} />} />  {/* LoginPageにsetLabを渡す */}

        {/* ログアウト時は再ログイン画面へ */}
        <Route path="/logout" element={<Navigate to="/login" />} />

        {/* ホームページ */}
        <Route
          path="/"
          element={lab ? <Home lab={lab} setLab={setLab} /> : <Navigate to="/login" />}
        />

        {/* 鍵の場所ページ */}
        <Route
          path="/keyPlace"
          element={lab ? <KeyPlace lab={lab} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
