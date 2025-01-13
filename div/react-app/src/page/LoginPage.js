import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const LoginPage = () => {
  const [memberName, setMemberName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // ログイン状態を管理
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        memberName,
        password,
      });

      // ログイン成功
      if (response.status === 200) {
        setIsLoggedIn(true); 
        
        navigate("/home"); 
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = async () => {
    const response = await fetch("http://localhost:5000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setIsLoggedIn(false); 
      navigate("/login"); 
    } else {
      alert("ログアウトに失敗しました");
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>名前</label>
          <input
            type="text"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">ログイン</button>
      </form>

      {isLoggedIn && (
        <div>
          <h3>ログイン中</h3>
          <button onClick={handleLogout}>ログアウト</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

