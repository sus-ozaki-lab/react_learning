import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setLab }) => {
  const [memberName, setMemberName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        memberName,
        password,
      });

      if (response.status === 200) {
        const { lab, memberID } = response.data; // ログイン後に受け取るデータ
        setLab(lab); // lab情報を親コンポーネントで管理
        localStorage.setItem('memberID', memberID);

        navigate("/"); // ログイン成功後にホームページへリダイレクト
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "ログインに失敗しました。再試行してください。";
      setError(errorMessage);
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
    </div>
  );
};

export default LoginPage;
