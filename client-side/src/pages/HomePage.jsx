import { useAuth } from '../context/auth';
import Layout from './../components/Layout/Layout';


const Home = () => {
const [auth] = useAuth();
  return (
    <Layout title='Home' >
      <div className="App">

        {/* Hero Section */}
        <section className="hero h-screen bg-gradient-to-r from-purple-500 to-pink-500">
        <pre>

{JSON.stringify(auth,null, 4)}
</pre>

          <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full xl:w-1/2 p-4 xl:p-6">
                <h1 className="text-5xl font-bold text-white mb-4">
                 
                  Welcome to Our E-Commerce Store
                </h1>
                <p className="text-lg text-white mb-6">
                  Discover the latest products and exclusive deals tailored just for you.
                </p>
                <div className="flex justify-center xl:justify-start">
                  <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded hover:bg-blue-700 transition duration-200">
                    Shop Now
                  </button>
                </div>
              </div>
              <div className="w-full xl:w-1/2 p-4 xl:p-6">
                <iframe src="https://lottie.host/embed/36bb57f9-5269-453e-8832-3f3eac08405d/VMivjali9I.json" height={"500px"} width={"500px"}></iframe>
              </div>
            </div>
          </div>
        </section>

     {/* Features Section */}
<section className="features py-20 bg-white">
  <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
    <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
      Our Features
    </h2>
    <div className="flex flex-wrap items-center -mx-4">
      <div className="w-full xl:w-1/2 p-4 xl:p-6">
        <iframe src="https://lottie.host/embed/e2b33827-6f6f-4829-ab85-a76b0d968d4b/SdIxBgdvq9.lottie" height={"500px"} width={"500px"}></iframe>
      </div>
      <div className="w-full xl:w-1/2 p-4 xl:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Feature 1 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-700 transition-transform transform hover:scale-105">
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
              Fast and Secure Checkout
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our checkout process is fast, secure, and easy to use.
            </p>
            <i className="fas fa-lock text-green-500 text-lg"></i>
          </div>
          {/* Feature 2 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-700 transition-transform transform hover:scale-105">
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
              Easy Returns and Refunds
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We offer easy returns and refunds for all orders.
            </p>
            <i className="fas fa-undo text-green-500 text-lg"></i>
          </div>
          {/* Feature 3 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-700 transition-transform transform hover:scale-105">
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
              24/7 Customer Support
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our customer support team is available 24/7 to help you.
            </p>
            <i className="fas fa-headphones text-green-500 text-lg"></i>
          </div>
          {/* Feature 4 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-700 transition-transform transform hover:scale-105">
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
              Free Shipping on Orders Over $50
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We offer free shipping on all orders over $50.
            </p>
            <i className="fas fa-truck text-green-500 text-lg"></i>
          </div>
          {/* Feature 5 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-700 transition-transform transform hover:scale-105">
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
              Multiple Payment Options
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We accept multiple payment options for your convenience.
            </p>
            <i className="fas fa-credit-card text-green-500 text-lg"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* Products Section */}
        <section className="products py-20 bg-white">
          <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
              Featured Products
            </h2>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Product Card 1 */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-700 transition-transform transform hover:scale-105">
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                  Product 1
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  A brief description of Product 1. It has amazing features.
                </p>
                <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                  Buy Now
                </button>
              </div>
              {/* Product Card 2 */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-700 transition-transform transform hover:scale-105">
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                  Product 2
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  A brief description of Product 2. It has amazing features.
 </p>
                <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                  Buy Now
                </button>
              </div>
              {/* Product Card 3 */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-700 transition-transform transform hover:scale-105">
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                  Product 3
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  A brief description of Product 3. It has amazing features.
                </p>
                <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Home;