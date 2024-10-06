import {Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage";
import PolicyPage from "./pages/PolicyPage.jsx";
import Page404 from "./pages/Page-404.jsx";

export default function App() {
  return (
   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/policy" element={<PolicyPage />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    
  );
}

 
