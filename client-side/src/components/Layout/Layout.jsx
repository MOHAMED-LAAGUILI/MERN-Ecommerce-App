import Footer from "./Footer";
import Header from "./Header";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import Helmet from "react-helmet";
export default function Layout({ children, title, description, keyword, author}) {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keyword} />
                <meta name="author" content={author} />

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
            <main style={{ minHeight: "85vh" }}>
                {children}
                </main>
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
}