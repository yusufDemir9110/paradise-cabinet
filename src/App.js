import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./admin/loginPages/Login";
import Privacy from "./components/Privacy";
import HomePage from "./homePage/HomePage";
import ProductDetail from "./components/ProductDetail";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path={process.env.PUBLIC_URL + "/"} element={<HomePage />} />
        <Route
          path={process.env.PUBLIC_URL + "/adminmfy9000"}
          element={<Login />}
        />
        <Route
          path={process.env.PUBLIC_URL + "/privacy"}
          element={<Privacy />}
        />
        <Route
          path={process.env.PUBLIC_URL + "/productDetail"}
          element={<ProductDetail />}
        />
      </Routes>
    </div>
  );
}

export default App;
