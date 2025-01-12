import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import KeyPlace from "./pages/keyPlace";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/keyPlace" element={<KeyPlace />} />
      </Routes>
    </Router>
  );
}

export default App;
