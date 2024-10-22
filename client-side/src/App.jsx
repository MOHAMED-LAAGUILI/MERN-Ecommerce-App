import { Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/user/HomePage.jsx";
import AboutPage from "./pages/user/AboutPage.jsx";
import ContactPage from "./pages/user/ContactPage";
import PolicyPage from "./pages/user/PolicyPage.jsx";
import Page404 from "./pages/user/Page_404.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import CartPage from "./pages/user/CartPage.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import AdminDashboardPage from "./pages/admin/Admin-Dashboard.jsx";
import CreateProduct from "./pages/admin/Admin_Create_Product.jsx";
import CrudCategory from "./pages/admin/Admin_CRUD_Category.jsx";
import CrudUsers from "./pages/admin/Admin-CRUD-Users.jsx";
import List_Products from "./pages/admin/Admin_List_Products.jsx";
import SingleProductUpdate from "./pages/admin/Admin_Single_Product_Update.jsx";
import SingleProductViewDetails from "./pages/admin/Single_Product_ViewDetails.jsx";
import AdminOrders from "./pages/admin/Admin-CRUD-UserOrders.jsx";
import UserOrdersPage from "./pages/user/User_Orders.jsx";
import UserUpdateProfile from "./pages/user/User_Update_Profile.jsx";
import UserProfile from "./pages/user/User_Profile.jsx";

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
      <Route path="/dashboard/admin/users-orders" element={<AdminOrders />} />
      {/* USER */}

      {/* Common Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/policy" element={<PolicyPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/update-profile" element={<UserUpdateProfile />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/user-orders" element={<UserOrdersPage />} />
      {/* Authantication */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* 404 | Not Found  */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
