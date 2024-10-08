import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage";
import PolicyPage from "./pages/PolicyPage.jsx";
import Page404 from "./pages/Page-404.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import CartPage from "./pages/CartPage.jsx";
import DashboardPage from "./pages/user/dashboard.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/policy" element={<PolicyPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
