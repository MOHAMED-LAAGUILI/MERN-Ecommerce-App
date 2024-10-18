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
import CreateProduct from "./pages/admin/Admin_Create_Product.jsx";
import CrudCategory from "./pages/admin/Admin_CRUD_Category.jsx";
import CrudUsers from "./pages/admin/Admin-Crud-Users.jsx";
import List_Products from "./pages/admin/Admin_List_Products.jsx";
import SingleProductUpdate from "./pages/admin/Admin_Single_Product_Update.jsx";
import SingleProductViewDetails from "./pages/admin/Single_Product_ViewDetails.jsx";
import CrudOrdrs from "./pages/admin/Admin-CRUD-UserOrders.jsx";

export default function App() {
  return (
    <Routes>
      {/* Admin */}
      <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
      <Route
        path="/dashboard/admin/crud-categories"
        element={<CrudCategory />}
      />
      <Route
        path="/dashboard/admin/create-products"
        element={<CreateProduct />}
      />
      <Route
        path="/dashboard/admin/list-products"
        element={<List_Products />}
      />
      <Route
        path="/dashboard/admin/get-product/:slug"
        element={<SingleProductUpdate />}
      />
      <Route path="/product/:slug" element={<SingleProductViewDetails />} />
      <Route path="/dashboard/admin/users" element={<CrudUsers />} />
      <Route path="/dashboard/admin/users-orders" element={<CrudOrdrs />} />
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
