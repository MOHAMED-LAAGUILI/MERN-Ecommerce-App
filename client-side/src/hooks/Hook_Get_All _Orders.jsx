import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

const apiUrl = import.meta.env.REACT_APP_API;

const useGetAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/v1/auth/get-users-orders`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          }
        );
        setOrders(data || []);
        toast.success("Orders loaded successfully");
      } catch (error) {
        console.error(`Failed to fetch orders`, error);
        setError(error);
        toast.error(`Failed to fetch orders: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};

export default useGetAllOrders;