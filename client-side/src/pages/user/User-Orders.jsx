import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const UserOrders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const apiUrl = import.meta.env.REACT_APP_API;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/v1/orders`, {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        if (data.success) {
          setOrders(data.orders);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error(`Failed to fetch orders: ${error.response?.data?.message || error.message}`);
      }
    };

    fetchOrders();
  }, [auth.token, apiUrl]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Order ID</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Total</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200">
              <td className="py-2 px-4">{order.id}</td>
              <td className="py-2 px-4">{order.date}</td>
              <td className="py-2 px-4">{order.total}</td>
              <td className="py-2 px-4">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrders;