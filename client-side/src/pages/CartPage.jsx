import { Link } from "react-router-dom";

import Layout from "../components/Layout/Layout";

const cartItems = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    quantity: 2,
    image: "./src/assets/images/product1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 19.99,
    quantity: 1,
    image: "./src/assets/images/product2.jpg",
  },
  // Add more products as needed
];

export default function CartPage() {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
   
      <Layout title={"Shopping Cart"}>
        <div className="max-w-screen-xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-lg text-gray-500">Your cart is empty.</p>
              <Link to="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover mr-4" />
                        <div>
                          <h2 className="text-lg font-semibold">{item.name}</h2>
                          <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Total: ${totalPrice}</h2>
                <div className="mt-4">
                  <Link
                    to="/checkout"
                    className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    )
  
}
