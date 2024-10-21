import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useAuth } from "../context/auth";

const apiUrl = import.meta.env.VITE_REACT_APP_API;

const Hook_Get_User_Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/auth/user-orders`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      
      console.log("Fetched Orders Data:", data); // Log the fetched data

      if (data.success) {
        setOrders(data.orders);
        toast.success("All data fetched");
      } else {
        toast.error();
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(`Failed to fetch orders: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    if (auth.token) { 
      fetchOrders();
    }
  }, [auth.token]);

  return orders;  // Return the fetched orders
};


export default Hook_Get_User_Orders;
