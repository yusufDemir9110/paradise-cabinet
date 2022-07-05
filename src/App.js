import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./admin/loginPages/Login";
import Privacy from "./components/Privacy";

import HomePage from "./homePage/HomePage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adminmfy9000" element={<Login />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </div>
  );
}

export default App;
