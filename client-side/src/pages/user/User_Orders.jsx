import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import toast from "react-hot-toast";
import { Modal } from "flowbite-react";
import { FaEye, FaDollarSign } from "react-icons/fa";
import UserProfileDashboard from "./User_Profile_Dashboard";

const apiUrl = import.meta.env.REACT_APP_API;

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/auth/user-orders/${auth.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setOrders(data);
      toast.success("Orders fetched successfully!");
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response ? error.response.data : error.message
      );
      //  toast.error(`Failed to fetch orders. ID: ${auth.user._id} error: ${error}`);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const calculateTotalPrice = (products) => {
    return products.reduce(
      (total, product) => total + product.price * (product.quantity || 0),
      0
    );
  };

  return (
    <Layout title="Orders">
      <div className="flex flex-col md:flex-row">
        <aside
          className="dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-900 w-full md:w-64 h-auto md:h-screen p-4 shadow-lg md:sticky md:top-0 overflow-hidden"
          style={{ minHeight: "79.5vh" }}
        >
          <UserProfileDashboard />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-3xl font-semibold text-center mb-6">
            All Orders
          </h1>

          {orders.length === 0 ? (
            <div className="text-center py-4 px-8 bg-blue-100 text-blue-700 rounded-lg shadow-md">
              No orders found.
            </div>
          ) : (
            orders.map((order, index) => (
              <div
                key={order._id}
                className="bg-white backdrop-blur-md bg-opacity-30 border border-gray-200 rounded-lg shadow-md mb-4 overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="p-4 flex justify-between items-center">
                  <h2 className="text-lg font-bold">Order #{index + 1}</h2>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-gray-700">
                    <strong>Buyer:</strong> {order.buyer?.username || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Date:</strong> {moment(order.createdAt).fromNow()}
                  </p>
                  <p className="text-gray-700">
                    <strong>Payment:</strong>{" "}
                    {order.payment.success ? "Success" : "Failed"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Total Items:</strong> {order.products.length}
                  </p>
                  <p className="text-gray-700">
                    <strong>Total Price:</strong> $
                    {calculateTotalPrice(order.products).toFixed(2)}
                  </p>
                  <p className="text-gray-700">
                    <strong>Shipping:</strong>{" "}
                    {order.shipping
                      ? `${order.shipping.address}, ${order.shipping.city}, ${order.shipping.state}`
                      : "No shipping info"}
                  </p>
                  <strong>Contact Number:</strong>{" "}
                  {selectedOrder ? selectedOrder.shipping.phone : "No number"}
                  <div className="flex items-center mt-2">
                    <button
                      className="flex items-center text-blue-500 hover:text-blue-700 underline"
                      onClick={() => openModal(order)}
                    >
                      <FaEye className="mr-1" />
                      View Details
                    </button>
                    <span
                      className={`ml-2 flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                        order.payment.success
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <FaDollarSign className="mr-1" />
                      {order.payment.success ? "Paid" : "Unpaid"}
                    </span>
                  </div>
                </div>

                {/* Modal for Order Details */}
                <Modal show={isOpen} onClose={closeModal}>
                  <Modal.Header>Order Details</Modal.Header>
                  <Modal.Body className="max-h-[80vh] overflow-y-auto">
                    {/* Check if selectedOrder exists before rendering details */}
                    {selectedOrder ? (
                      <>
                        {/* Shipping Info */}
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold">
                            Shipping Information
                          </h3>
                          {selectedOrder.shipping ? (
                            <>
                              <p className="text-gray-700">
                                <strong>Name:</strong>{" "}
                                {selectedOrder.shipping.username || "N/A"}
                              </p>
                              <p className="text-gray-700">
                                <strong>Address:</strong>{" "}
                                {selectedOrder.shipping.address || "N/A"}
                              </p>

                              <p className="text-gray-700">
                                <strong>City:</strong>{" "}
                                {selectedOrder.shipping.city || "N/A"}
                              </p>
                              <p className="text-gray-700">
                                <strong>State:</strong>{" "}
                                {selectedOrder.shipping.state || "N/A"}
                              </p>
                              <p className="text-gray-700">
                                <strong>Zip Code:</strong>{" "}
                                {selectedOrder.shipping.zip || "N/A"}
                              </p>
                              <p className="text-gray-700">
                                <strong>Phone:</strong>{" "}
                                {selectedOrder.shipping.phone || "N/A"}
                              </p>
                            </>
                          ) : (
                            <p className="text-gray-700">
                              No shipping info available.
                            </p>
                          )}
                        </div>

                        {/* Payment Info */}
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold">
                            Payment Information
                          </h3>
                          <p className="text-gray-700">
                            <strong>Payment Status:</strong>{" "}
                            {selectedOrder.payment.success ? "Paid" : "Unpaid"}
                          </p>
                          <p className="text-gray-700">
                            <strong>Total Price:</strong> $
                            {calculateTotalPrice(
                              selectedOrder.products || []
                            ).toFixed(2)}
                          </p>
                        </div>

                        {/* Grouped Products Info */}
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold">Products</h3>
                          {Object.values(
                            selectedOrder.products.reduce((acc, product) => {
                              if (!acc[product._id]) {
                                acc[product._id] = { ...product, quantity: 0 };
                              }
                              acc[product._id].quantity += product.quantity;
                              return acc;
                            }, {})
                          ).map((product) => (
                            <div
                              className="flex items-center mb-4"
                              key={product._id}
                            >
                              <img
                                src={`${apiUrl}/api/v1/product/product-photo/${product._id}`}
                                className="w-16 h-16 rounded object-cover"
                                alt={product.name}
                              />
                              <div className="ml-4">
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-gray-600">
                                  {product.description.substring(0, 50)}
                                  {product.description.length > 50 ? "..." : ""}
                                </p>
                                <p className="text-gray-800">
                                  <strong>Price:</strong> $
                                  {product.price.toFixed(2)}
                                </p>
                                <p className="text-gray-800">
                                  <strong>Quantity:</strong> {product.quantity}
                                </p>
                                <p className="text-gray-800">
                                  <strong>Total:</strong> $
                                  {(product.price * product.quantity).toFixed(
                                    2
                                  )}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-700">No order selected.</p>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Close
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
            ))
          )}
        </main>
      </div>
    </Layout>
  );
};

// Helper function to determine status color
const getStatusClass = (status) => {
  switch (status) {
    case "Shipped":
      return "bg-green-100 text-green-800";
    case "Processing":
      return "bg-yellow-100 text-yellow-800";
    case "Delivered":
      return "bg-blue-100 text-blue-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default UserOrdersPage;
