import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import {
  FaFilter,
  FaShippingFast,
  FaMoneyBillWave,
  FaHeart,
  FaEye,
} from "react-icons/fa";
import { useCart } from "../../context/cart";
import useCategory from "../../hooks/Hook_Get_All _Categories";
import useGetAllProducts from "../../hooks/Hook_Get_All _Products";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import SpinnerLoading from "../../components/SpinnerLoading";

const Home = () => {
  const { products, loading } = useGetAllProducts();
  const categories = useCategory();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(1000);
  const [shippingFilter, setShippingFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [cart, setCart] = useCart();
  const apiUrl = import.meta.env.REACT_APP_API;
  const navigate = useNavigate();

  const filterProducts = () => {
    let filtered = [...products];
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category._id === selectedCategory
      );
    }
    filtered = filtered.filter((product) => product.price <= priceRange);
    if (shippingFilter !== null) {
      filtered = filtered.filter((product) =>
        shippingFilter ? product.shipping : !product.shipping
      );
    }
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };

  const handleShippingChange = (value) => {
    setShippingFilter(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange(1000);
    setShippingFilter(null);
    setSearchTerm("");
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, priceRange, shippingFilter, searchTerm, products]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const truncateText = (text, maxLength) => {
    return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
  };

  return (
    <Layout title="All Products Best Offers">
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="container py-10 flex flex-col md:flex-row gap-8 w-full">
          {/* Filter Section */}
          <div
            className="md:w-1/5 bg-white dark:bg-gray-800 px-6 py-2 rounded-lg shadow-lg"
            style={{ minHeight: "79.5vh" }}
          >
            <h1 className="text-lg font-semibold dark:text-white flex items-center">
              <FaFilter className="text-orange-500 mr-2" /> Filters
            </h1>
            {/* Search Input */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search Products"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Category Filter */}
            <div className="space-y-2 mt-4 dark:text-gray-100">
              <h2 className="text-md font-medium dark:text-gray-200">
                Category
              </h2>
              <button
                className={`block py-2 px-3 rounded-lg ${
                  selectedCategory === "all"
                    ? "bg-orange-500 text-gray-900 font-bold dark:text-gray-100"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
                onClick={() => handleCategoryChange("all")}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  className={`block py-2 px-3 rounded-lg ${
                    selectedCategory === category._id
                      ? "dark:text-gray-100 bg-orange-500 text-gray-900 font-bold"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                  onClick={() => handleCategoryChange(category._id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Price Filter */}
            <div className="space-y-2 mt-4">
              <h2 className="text-md font-medium dark:text-gray-200">
                <FaMoneyBillWave className="text-orange-500 inline-block" />{" "}
                Price Range
              </h2>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange}
                onChange={handlePriceChange}
                className="w-full h-2 bg-blue-500 rounded-lg appearance-none"
              />
              <p className="dark:text-gray-400">Up to ${priceRange}</p>
            </div>

            {/* Shipping Filter */}
            <div className="space-y-2 mt-4">
              <h2 className="text-md font-medium dark:text-gray-200">
                <FaShippingFast className="text-orange-500 inline-block" />{" "}
                Shipping
              </h2>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="shipping"
                  value="free"
                  onChange={() => handleShippingChange(true)}
                  className="form-radio"
                />
                <span className="dark:text-gray-200">Free Shipping</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="shipping"
                  value="paid"
                  onChange={() => handleShippingChange(false)}
                  className="form-radio"
                />
                <span className="dark:text-gray-200">Paid Shipping</span>
              </label>
              {/* Reset Filter */}
              <button
                className="dark:text-gray-100 font-bold text-gray-900 border border-gray-900 bg-orange-500 rounded-md py-2 px-4 mt-2 w-full transition-colors duration-300 hover:bg-orange-600"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Section */}
          <div className="w-full md:w-4/5">
            <h1 className="text-3xl mb-4 font-semibold dark:text-white">
              <FaShippingFast className="text-orange-500 inline-block" /> All
              Products
            </h1>
            {loading ? (
              <SpinnerLoading
                message={"Loading Products"}
                color={{ color: "red", number: 500 }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                {displayedProducts.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-300 text-center col-span-full">
                    No products found for the selected filters.
                  </p>
                ) : (
                  displayedProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
                    >
                      <img
                        src={`${apiUrl}/api/v1/product/product-photo/${product._id}`}
                        className="object-cover w-full h-48 mb-2"
                        alt={product.name}
                      />
                      <div className="p-4">
                        <h5 className="text-md font-bold dark:text-white mb-1">
                          {product.name}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {truncateText(product.description, 50)}
                        </p>
                        <p className="font-semibold text-blue-500 text-lg">
                          ${product.price}
                        </p>
                        <p className="font-semibold dark:text-gray-300 text-lg">
                         Shipping : {product.shipping ? "Free":"Paid"}
                        </p>
                        <div className="flex justify-between mt-4">
                          <button
                            onClick={() => {
                              setCart([...cart, product]);
                              toast.success("Item added to cart");
                            }}
                            className="flex items-center text-white bg-orange-500 rounded-lg px-2 py-1 hover:bg-orange-600 transition-colors duration-300"
                          >
                            <FaHeart className="mr-1" /> Cart
                          </button>
                          <button
                            onClick={() => navigate(`/product/${product.slug}`)}
                            className="flex items-center text-gray-600 dark:text-gray-200 rounded-lg px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                          >
                            <FaEye className="mr-1" /> View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="bg-orange-500 text-white py-1 px-3 rounded-l hover:bg-orange-600 transition-colors duration-300"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="py-1 px-3 text-gray-700 dark:text-gray-300">
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="bg-orange-500 text-white py-1 px-3 rounded-r hover:bg-orange-600 transition-colors duration-300"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
