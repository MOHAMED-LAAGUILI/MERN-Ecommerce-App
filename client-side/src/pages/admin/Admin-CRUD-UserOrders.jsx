import { useState } from "react";

import AdminMenu from "./Admin-Menu";
import Layout from "../../components/Layout/Layout";
import moment from "moment";
import { Select, Modal, Spin, Alert } from "antd";
import useGetAllOrders from "../../hooks/Hook_Get_All _Orders";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
const { Option } = Select;
const apiUrl = import.meta.env.REACT_APP_API;


const AdminOrders = () => {
  const { orders, loading, error } = useGetAllOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
const [auth] = useAuth()
  const statusOptions = [
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const setChangeStatus = async (orderId, value) => {
    try {
      const { data } = await axios.put(`${apiUrl}/api/v1/auth/update-order-status/${orderId}`, { status: value }, {
        headers: {
          Authorization: `Bearer ${auth.token}` // Include the token from auth context
        }
      });
      // Optionally, you can handle the response data here
      toast.success(data.message);
      return orders; // Return updated order data if needed
    } catch (error) {
      console.error("Error updating order status:", error.response ? error.response.data : error.message);
      toast.error(`Failed to update order status. ${error}`);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-4">
          <AdminMenu />
        </div>
        <div className="w-full md:w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4 text-center">All Orders</h1>
          {loading ? (
            <div className="flex justify-center">
              <Spin size="large" />
            </div>
          ) : error ? (
            <Alert message="Error" description={error.message} type="error" />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Order ID</th>
                    <th className="px-4 py-2 text-left">Buyer</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Payment</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="px-4 py-2">{order._id.substring(0, 8)}...</td>
                      <td className=" px-4 py-2">{order.buyer?.username}</td>
                      <td className="px-4 py-2">{moment(order.createdAt).format('MMM D, YYYY')}</td>
                      <td className="px-4 py-2">
                        <Select
                          defaultValue={order.status}
                          style={{ width: 120 }}
                          onChange={(value) => {
                            setChangeStatus(value,order._id)
                          }}
                        >
                          {statusOptions.map((status,index) => (
                            <Option key={index} value={status}>{status}</Option>
                          ))}
                        </Select>
                      </td>
                      <td className="px-4 py-2">
                        <span className={order.payment?.success ? 'text-green-600' : 'text-red-600'}>
                          {order.payment?.success ? 'Success' :  'Failed'}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => showOrderDetails(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedOrder && (
          <div>
            <h2 className="text-lg font-bold mb-2">Order ID: {selectedOrder._id}</h2>
            <p className="text-sm text-gray-600 mb-2">Buyer: {selectedOrder.buyer?.name}</p>
            <p className="text-sm text-gray-600 mb-2">Date: {moment(selectedOrder.createdAt).format('MMM D, YYYY')}</p>
            <p className="text-sm text-gray-600 mb-2">Status: {selectedOrder.status}</p>
            <p className="text-sm text-gray-600 mb-2">Payment: {selectedOrder.payment?.success ? 'Success' : 'Failed'}</p>
            <h3 className="text-lg font-bold mb-2">Products</h3>
            {selectedOrder.products?.map((product) => (
              <div key={product._id} className="flex mb-4">
                <img
                  src={`${apiUrl}/api/v1/product/product-photo/${product._id}`}
                  className="w-24 h-24 object-cover rounded-lg"
                  alt={product.name}
                />
                <div className="ml-4">
                  <p className="text-lg font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.description.substring(0, 30)}</p>
                  <p className="text-lg font-medium">Price: {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default AdminOrders;