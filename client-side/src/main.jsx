import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";
import { CartProvider } from "./context/cart.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
    <BrowserRouter>
      <StrictMode>
      <App />
      </StrictMode>
    </BrowserRouter>
    </CartProvider>
  </AuthProvider>
);
