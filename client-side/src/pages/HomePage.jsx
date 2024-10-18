import Layout from './../components/Layout/Layout';
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(1000); // default max price
  const [shippingFilter, setShippingFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const apiUrl = import.meta.env.REACT_APP_API;
 
  const getAllProducts = async () => {
    setLoading(true); // Start loading
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/product/get-all-products`);
      if (!data.success) {
        toast.error(`Error Fetching Products: ${data.message}`);
        return;
      }
      setProducts(data.products);
      setFilteredProducts(data.products); // Initialize with all products
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/category/all-categories`);
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories");
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category._id === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(product => product.price <= priceRange);

    // Shipping filter
    if (shippingFilter !== null) {
      filtered = filtered.filter(product => (shippingFilter ? product.shipping : !product.shipping));
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset current page to 1 whenever filters change
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
    getAllProducts();
    getCategories();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    filterProducts();
    //eslint-disable-next-line
  }, [selectedCategory, priceRange, shippingFilter, searchTerm, products]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  // Utility function to truncate text description
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  return (
    <Layout title="All Products Best Offers">
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="container py-10 flex flex-col md:flex-row gap-8 w-full">
          {/* Filter Section */}
          <div className="md:w-1/5 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md" style={{ minHeight: "79.5vh", minWidth: "25%" }}>
            <h1 className="text-lg font-semibold dark:text-white">Filters</h1>
            {/* Search Input */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search Products"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="space-y-2 mt-4 dark:text-gray-100">
              <h2 className="text-md font-medium dark:text-gray-200">Category</h2>
              <button className={`block py-1 px-2 rounded-lg ${selectedCategory === "all" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                onClick={() => handleCategoryChange("all")}>
                All Categories
              </button>
              {categories.map((category) => (
                <button key={category._id} className={`block py-1 px-2 rounded-lg ${selectedCategory === category._id ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                  onClick={() => handleCategoryChange(category._id)}>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Price Filter */}
            <div className="space-y-2 mt-4">
              <h2 className="text-md font-medium dark:text-gray-200">Price Range</h2>
              <input type="range" min="0" max="1000" value={priceRange} onChange={handlePriceChange}
                className="w-full h-2 bg-blue-500 rounded-lg appearance-none" />
              <p className="dark:text-gray-400">Up to ${priceRange}</p>
            </div>

            {/* Shipping Filter */}
            <div className="space-y-2 mt-4">
              <h2 className="text-md font-medium dark:text-gray-200">Shipping</h2>
              <label className="flex items-center space-x-2">
                <input type="radio" name="shipping" value="free" onChange={() => handleShippingChange(true)}
                  className="form-radio" />
                <span className="dark:text-gray-200">Free Shipping</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="shipping" value="paid" onChange={() => handleShippingChange(false)}
                  className="form-radio" />
                <span className="dark:text-gray-200">Paid Shipping</span>
              </label>
              {/* Reset Filter */}
              <button className="text-gray-200 border border-green-500 bg-pink-600 rounded-md py-1 px-2 " onClick={resetFilters}>Reset Filters</button>
            </div>
          </div>

          {/* Products Section */}
          <div className="w-full md:w-4/5">
            <h1 className="text-lg mb-4 font-semibold dark:text-white">All Products</h1>

            {loading ? (
              <div className="flex justify-center items-center h-full">
                <b>
                  Loading Products
                </b>
                <div className="loader"></div> {/* Loading spinner */}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {displayedProducts.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-300">No products found for the selected filters.</p>
                ) : (
                  displayedProducts.map((product) => (
                    <div key={product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex flex-col items-center">
                      <img
                        src={`${apiUrl}/api/v1/product/product-photo/${product._id}`}
                        className="object-cover rounded-lg mb-2"
                        alt={product.name}
                      />
                      <h5 className="text-sm font-bold dark:text-white mb-1">{product.name}</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                        {truncateText(product.description, 50)} {/* Truncate description to 50 characters */}
                      </p>
                      <p className="font-semibold text-blue-500 text-sm">${product.price}</p>
                      <button onClick={() => navigate(`/product/${product.slug}`)} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg">View Product</button>
                      </div>
                  ))
                )}
              </div>
            )}
            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 bg-blue-500 text-white rounded-l-lg">Previous</button>
              <span className="px-4 py-1 dark:text-gray-100">{currentPage} / {totalPages}</span>
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 bg-blue-500 text-white rounded-r-lg">Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
