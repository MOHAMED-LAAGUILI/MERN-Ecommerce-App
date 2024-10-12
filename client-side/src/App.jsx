import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage";
import PolicyPage from "./pages/PolicyPage.jsx";
import Page404 from "./pages/Page-404.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import CartPage from "./pages/CartPage.jsx";
import UserDashboardPage from "./pages/user/user-dashboard.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import Profile from "./pages/Profile.jsx";
import AdminDashboardPage from "./pages/admin/admin-dashboard.jsx";
import CreateProduct from "./pages/admin/CreateProduct.jsx";
import CreateCategory from "./pages/admin/CreateCategory.jsx";
import Users from "./pages/admin/Users.jsx";
import "./index.css";
export default function App() {
  return (
    <Routes>
      {/* USER */}
      <Route path="/dashboard/user" element={<UserDashboardPage />} />
      {/* Admin */}
      <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
      <Route path="/dashboard/admin/create-categories" element={<CreateCategory />} />
      <Route path="/dashboard/admin/create-products" element={<CreateProduct />} />
      <Route path="/dashboard/admin/users" element={<Users />} />
      {/* Common Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/policy" element={<PolicyPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<CartPage />} /> 
      {/* Authantication */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* 404 | Not Found  */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
