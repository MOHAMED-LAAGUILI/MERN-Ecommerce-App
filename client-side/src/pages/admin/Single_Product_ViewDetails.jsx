import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaMoneyBillWave, FaTag, FaBox, FaShippingFast } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

const SingleProductViewDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [showImageBox, setShowImageBox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 3; // Number of items per page
  const apiUrl = import.meta.env.REACT_APP_API;

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/product/get-product/${params.slug}`);
      setProduct(data.product);
      getSimilarProducts(data.product.category._id); // Fetch similar products based on category
    } catch (error) {
      console.log(error);
      toast.error("Error fetching product details");
    }
  };

  const getSimilarProducts = async (categoryId) => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/product/similar-products/${categoryId}`);
      setSimilarProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching similar products");
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, [params.slug]); 

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageBox(true);
  };

  const closeImageBox = () => {
    setShowImageBox(false);
    setSelectedImage(null);
  };

  // Pagination Logic
  const totalItems = similarProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = similarProducts.slice(startIndex, endIndex); // Get the current items for the page

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!product) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl">Loading...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={product.name}>
      <div className="container mx-auto p-5">
        <h1 className={"text-2xl font-semibold mb-4 dark:text-gray-100"}>Product details</h1>
        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 duration-300">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <div className="flex justify-center mb-4">
            <img
              src={`${apiUrl}/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="object-cover rounded-lg w-72 h-72 shadow-md cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => handleImageClick(`${apiUrl}/api/v1/product/product-photo/${product._id}`)}
            />
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-2">
            <FaMoneyBillWave className="text-blue-500 mr-2" />
            <span className="font-semibold text-lg">Price: ${product.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaTag className="text-green-500 mr-2" />
            <span className="text-gray-500">Category: {product.category?.name || "Unknown"}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaBox className="text-orange-500 mr-2" />
            <span className="text-gray-500">Quantity: {product.quantity}</span>
          </div>
          <div className="flex items-center mb-4">
            <FaShippingFast className="text-red-500 mr-2" />
            <span className="text-gray-500">Shipping: {product.shipping ? "Free" : "Paid"}</span>
          </div>
          <button
            className="flex items-center justify-center mt-4 w-full p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/cart")}
          >
            <AiFillHeart className="mr-2" />
            Add to Cart
          </button>
        </div>

        {/* Similar Products Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentItems.length > 0 ? (
              currentItems.map((similarProduct) => (
                <div
                  key={similarProduct._id}
                  className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 duration-300"
                >
                  <img
                    src={`${apiUrl}/api/v1/product/product-photo/${similarProduct._id}`}
                    alt={similarProduct.name}
                    className="object-cover rounded-lg w-full h-48 mb-2 cursor-pointer"
                    onClick={() => handleImageClick(`${apiUrl}/api/v1/product/product-photo/${similarProduct._id}`)}
                  />
                  <h3 className="text-lg font-semibold">{similarProduct.name}</h3>
                  <p className="text-gray-600 mb-2">{similarProduct.description}</p>
                  <div className="flex items-center mb-2">
                    <FaMoneyBillWave className="text-blue-500 mr-1" />
                    <span className="font-semibold">${similarProduct.price.toFixed(2)}</span>
                  </div>
                  <button
                    className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    onClick={() => navigate(`/product/${similarProduct.slug}`)}
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No similar products found.</p>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            Previous
          </button>
          <span className="m-2 dark:text-gray-100 font-bold">{`${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Image Box Modal */}
      {showImageBox && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Zoomed"
              className="rounded-lg shadow-lg transition-transform transform scale-100 duration-300 hover:scale-110"
              onClick={closeImageBox} // Close the image box on click
            />
            <button
              onClick={closeImageBox}
              className="absolute top-2 right-2 text-white text-2xl bg-gray-800 rounded-full p-1 hover:bg-gray-700 transition"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SingleProductViewDetails;
