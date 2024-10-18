import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./Admin-Menu";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function List_Products() {
  const [products, setProducts] = useState([]);
  const apiUrl = import.meta.env.REACT_APP_API;

  /////// get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/product/get-all-products`
      );

      // Check for API success
      if (!data.success) {
        toast.error(`Error Fetching Products: ${data.message}`);
        return;
      }

      // Set the products
      setProducts(data.products);

      // If no products, show a message
      if (data.products.length === 0) {
        return toast.error("No Products. Try to add some!");
      }

      // Success message for fetching products
      return toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, []);

  //////////// delete product
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const { data } = await axios.delete(
          `${apiUrl}/api/v1/product/delete-product/${productId}`
        );
        if (data.success) {
          toast.success(data.message);
          setProducts(products.filter((p) => p._id !== productId)); // Remove deleted product from UI
        } else {
          toast.error(data.message || "Error deleting product");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-4">
          <AdminMenu />
        </div>
        <div className="md:w-3/4 p-4">
          <h1 className="text-3xl font-semibold text-center mb-6">
            All Products List
          </h1>
          <div className="flex flex-wrap justify-center">
            {products?.map((p) => (
              <div
                key={p._id}
                className="m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                  <Link to={`/dashboard/admin/get-product/${p.slug}`}>
                    <img
                      src={`${apiUrl}/api/v1/product/product-photo/${p._id}`}
                      className="w-full h-48 object-cover rounded-t-lg"
                      alt={p.name}
                    />
                    <h5 className="text-lg font-bold mt-2">{p.name}</h5>
                    <p className="text-gray-600">{p.description}</p>
                    <p className="font-semibold mt-1">
                      Price: ${p.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Category: {p.category?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {p.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Shipping: {p.shipping ? "Yes" : "No"}
                    </p>
                  </Link>

                  <button
                    className="ml-2 w-full p-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleDelete(p._id)} // Pass product ID here
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default List_Products;
