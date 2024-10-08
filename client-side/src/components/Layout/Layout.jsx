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
  keyword,
  author,
}) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    
        <link
          href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css"
          rel="stylesheet"
        />

        <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>

        <link
          defer
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
        />
      </Helmet>

      <Header />
      <Toaster />
      <main style={{ minHeight: "82vh" }} className="dark:bg-gray-900">{children}</main>
      <Footer />
    </>
  );
}

// Prop validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  keyword: PropTypes.node.isRequired, // Validate that children is a node and is required
  author: PropTypes.node.isRequired,
};

// props defaults value
Layout.defaultProps = {
  title: "Ecommerce - Shop now",
  description: "Mern Stack App",
  keyword: "Mern,React,Express,MongoDB",
  author: "LAAGUILI MOHAMED",
};
