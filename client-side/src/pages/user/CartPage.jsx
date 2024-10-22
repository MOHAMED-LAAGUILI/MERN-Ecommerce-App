//37:47 
// https://www.youtube.com/watch?v=QyunIFPa2rI&ab_channel=TechinfoYT

import { Badge } from "antd";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { FaCartPlus, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";

export default function CartPage() {
  const apiUrl = import.meta.env.REACT_APP_API;
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRemoveItem = (productId) => {
    const newCart = cart.filter((item) => item._id !== productId);
    setCart(newCart);
  };

  // Consolidate cart items by ID and count duplicates
  const consolidatedCart = cart.reduce((acc, product) => {
    const existingProduct = acc.find((item) => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity
    } else {
      acc.push({ ...product, quantity: 1 }); // Add new product with quantity
    }
    return acc;
  }, []);

  // Calculate total cost
  const totalCost = consolidatedCart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  ///////////get payement gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
    //eslint-disable-next-line
  }, [auth?.token]);

  ///////////////// handlePayment
  const handlePayment = async () => {
    setLoading(true); // Set loading to true when payment starts
    try {
      const { nonce } = await instance.requestPaymentMethod();
  
      const { data } = await axios.post(
        `${apiUrl}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
          // Include shipping information
          shipping: {
            address: auth.user.street,
            city: auth.user.city,
            state: auth.user.state,
            zip: auth.user.zip,
            phone: auth.user.phone,
          },
        }
      );
  
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/user-orders");
      toast.success(data.message || "Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  
  return (
    <Layout title={"Shopping Cart"}>
      <div className="max-w-screen-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-orange-600 flex items-center">
          <FaCartPlus className="mr-2" /> Your Shopping Cart
        </h1>

        <div className="flex flex-col">
          <>
            <b className="text-2xl px-10 text-gray-700">
              Hello, {auth?.token ? auth.user.username : "User"}!
            </b>
            {consolidatedCart.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <b className="mb-4 text-gray-700">
                    {`You have ${consolidatedCart.length} unique item${
                      consolidatedCart.length > 1 ? "s" : ""
                    } in your cart, totaling ${cart.length} items.`}
                  </b>
                  {consolidatedCart.map((product) => (
                    <Badge
                      key={product._id}
                      count={`x${product.quantity}`}
                      className={"text-3xl"}
                      offset={[-15, 15]}
                      text={`x${product.quantity}`}
                    >
                      <div className="flex items-center bg-gray-100 p-4 rounded-md shadow-md mb-4 transition-transform transform hover:scale-105">
                        <div className="w-1/4 overflow-hidden">
                          <img
                            src={`${apiUrl}/api/v1/product/product-photo/${product._id}`}
                            className="object-cover w-full h-40"
                            alt={product.name}
                          />
                        </div>
                        <div className="w-3/4 pl-4 flex flex-col justify-center">
                          <h2 className="text-lg font-semibold text-center">
                            {product.name}
                          </h2>
                          <p className="text-gray-600 text-center">
                            Price: ${product.price}
                          </p>
                          <p className="text-gray-600 text-center">
                            Total: $
                            {(product.price * product.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => handleRemoveItem(product._id)}
                            className="text-red-500 hover:text-red-700 transition duration-200 mt-2 mx-auto"
                          >
                            <FaTrashAlt className="inline-block mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </Badge>
                  ))}
                </div>

                <div className="md:col-span-2 mb-4">
                  <h2 className="font-bold text-2xl">
                    Total:{" "}
                    <b className="text-blue-500">${totalCost.toFixed(2)}</b>
                  </h2>

                  {auth.token ? (
                    <div className="md:col-span-1">
                      <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                        <h4 className="font-semibold">Payment Options</h4>
                        <div className="flex flex-wrap justify-center mb-4 p-5">
                          {clientToken && (
                           
                           <DropIn
                              options={{
                                authorization: clientToken,
                                paypal: {
                                  flow: "vault",
                                },
                              }}
                              onInstance={(instance) => setInstance(instance)}
                            />
                          )}

                        </div>

                        <div className="text-center">
                          <button
                            className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 transition duration-200"
                            onClick={handlePayment}
                            disabled={loading || !instance}
                            >
                            {loading ? "Processing...." : "Make Payment"}
                          </button>
                          <br />
                        <p className="text-gray-600">
                          Secure payments via PayPal or Credit/Debit Card.
                        </p>
                            </div>
                      </div>

                      <div className="mt-5 text-center">
                      <b>
                        Your Current Shipping Address <br />
                      </b>
                      {auth?.user?.state} | {auth?.user?.city} | {auth?.user?.street} | {auth?.user?.zip}
                      <br />
                      <b>
                        Your Current contact Number
                        <br />
                      </b>
                      {auth.user.phone}
                      <br />
                      <button
                        onClick={() => {
                          navigate("/update-profile");
                        }}
                        className="mt-5 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 transition duration-200"
                      >
                        Update Shiping address
                      </button>

                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="md:2/4 text-gray-600 mb-4">
                        You need to be logged in to view your cart and proceed
                        to checkout.
                      </p>
                      <div className="mt-4">
                        <Link to="/login">
                          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 transition duration-200">
                            Login To Checkout
                          </button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Your cart is currently empty.</p>
            )}
          </>
        </div>
      </div>
    </Layout>
  );
}
