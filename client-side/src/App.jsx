import { Routes, Route } from "react-router-dom";
import "./index.css";
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
import CreateProduct from "./pages/admin/Create_Product.jsx";
import CrudCategory from "./pages/admin/CRUD_Category.jsx";
import Users from "./pages/admin/Users.jsx";
import List_Products from './pages/admin/List_Products.jsx';
import SingleProduct from "./pages/admin/Single_Product.jsx";


export default function App() {
  return (
    <Routes>
      {/* Admin */}
      <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
      <Route path="/dashboard/admin/crud-categories" element={<CrudCategory />} />
      <Route path="/dashboard/admin/create-products" element={<CreateProduct />} />
      <Route path="/dashboard/admin/list-products" element={<List_Products />} />
      <Route path="/dashboard/admin/get-product/:slug" element={<SingleProduct />} />
      <Route path="/dashboard/admin/users" element={<Users />} />
      {/* USER */}
      <Route path="/dashboard/user" element={<UserDashboardPage />} />
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
