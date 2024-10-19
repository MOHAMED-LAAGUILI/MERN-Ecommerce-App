import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useGetAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.REACT_APP_API;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        const { data } = await axios.get(`${apiUrl}/api/v1/product/get-all-products`);
        console.log('Fetched Products:', data.products);
        if (!data.success) {
          toast.error(`Error Fetching Products: ${data.message}`);
          return;
        }
        setProducts(data.products);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, [apiUrl]); // Dependency array ensures fetch runs on mount

  return { products, loading };
};

export default useGetAllProducts;