// Components import
import Footer from "./Footer";
import Header from "./Header";

// for props
import PropTypes from "prop-types";

// Meta
import Helmet from "react-helmet";

// Toasts
import { Toaster } from 'react-hot-toast';

export default function Layout({
  children,
  title,
  description,
  keywords,
  author,
}) {

  title = title || "Ecommerce App - Shop Now";
  description = description || "MERN stack project providing a seamless shopping experience.";
  keywords = keywords || "mern, react, node, mongodb, ecommerce, online shopping, shop now";
  author = author || "Techinfoyt";

  // Check for saved user preference or default to light mode
  const isDarkMode = localStorage.getItem('theme') === 'dark';

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph Meta Tags for Social Media Sharing */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="https://yourwebsite.com/path-to-image.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://yourwebsite.com/path-to-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/path-to-your/favicon.ico" type="image/x-icon" />
        
        {/* Theme Color */}
        <meta name="theme-color" content={isDarkMode ? "#1a202c" : "#ffffff"} />

        {/* Stylesheets and Scripts */}
        <link 
          defer
          href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" 
          rel="stylesheet" 
        />
        <script defer src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
        <link 
          defer 
          rel="stylesheet" 
          href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" 
        />
      </Helmet>

      <Header />
      <Toaster />
      <main style={{ minHeight: "79.5vh" }} className={`bg-gray-100 dark:bg-gray-800 transition-colors duration-500`}>{children}</main>
      <Footer />
    </>
  );
}

// Prop validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  author: PropTypes.string,
};
