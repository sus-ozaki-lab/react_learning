// ChangeLocationButton.js
import React from "react";
import { Link } from "react-router-dom";

function ChangeLocationButton() {
  return (
    <div>
      <Link to="/keyPlace">
        <button>場所変更ボタン</button>
      </Link>
    </div>
  );
}

export default ChangeLocationButton;