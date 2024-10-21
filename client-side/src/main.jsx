import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";
import { CartProvider } from "./context/cart.jsx";
import ErrorBoundary from "antd/es/alert/ErrorBoundary.js";

// Create a root element for React to render
const root = createRoot(document.getElementById("root"));

// Render the application wrapped in necessary providers
root.render(
  <ErrorBoundary>
    <AuthProvider>
      <StrictMode>
        <BrowserRouter>
          <CartProvider>
            <App />
          </CartProvider>
        </BrowserRouter>
      </StrictMode>
    </AuthProvider>
  </ErrorBoundary>
);
