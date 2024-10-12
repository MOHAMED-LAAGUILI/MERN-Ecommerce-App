import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import Layout from "../components/Layout/Layout";
import { useState } from "react";

export default function Profile() {
  const [auth] = useAuth();
  const [showSecret, setShowSecret] = useState(false);

  const displayRole = (role) => {
    return role == 1 ? "Admin" : "User";
  };

  const toggleSecretVisibility = () => {
    setShowSecret(!showSecret);
  };

  return (
    <Layout title="Profile">
      <div className="max-w-6xl mx-auto pt-10 p-8 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
          <div className="flex-grow">
            <h1 className="text-4xl font-extrabold mb-2 text-gray-900 dark:text-white">
              {auth?.user?.username}
            </h1>
           <span className={"dark:text-white"}> 
            Account Type : {displayRole(auth?.user?.isAdmin)} 
            <br />
            UID : {auth?.user?._id}
            </span> 
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
             
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  { label: "Email", value: auth?.user?.email },
                  { label: "Phone", value: auth?.user?.phone },
                  {
                    label: "Address",
                    value: `${auth?.user?.street}, ${auth?.user?.city}, ${auth?.user?.state}, ${auth?.user?.zip}`,
                  },
                  { label: "Password", value: "****************" },
                  {
                    label: "Secret Word",
                    value: showSecret ? auth?.user?.answer : "••••••••",
                    isSecret: true,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow"
                  >
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      {item.label}
                    </label>
                    <div className="flex items-center justify-between">
                      <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {item.value}
                      </p>
                      {item.isSecret && (
                        <button
                          onClick={toggleSecretVisibility}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <i
                            className={`uil ${
                              showSecret ? "uil-eye-slash" : "uil-eye"
                            } text-2xl`}
                          ></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  {
                    to: "/dashboard/user/orders",
                    icon: "uil-box",
                    text: "My Orders",
                    color: "green",
                  },
                  {
                    to: "/dashboard/user/wishlist",
                    icon: "uil-heart",
                    text: "Wishlist",
                    color: "pink",
                  },
                  {
                    to: "/forgot-password",
                    icon: "uil-key-skeleton",
                    text: "Reset Password",
                    color: "purple",
                  },
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    className={`flex items-center justify-center w-full py-3 px-4 rounded-lg shadow-md text-sm font-medium text-white bg-${item.color}-600 hover:bg-${item.color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${item.color}-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105`}
                  >
                    <i className={`uil ${item.icon} mr-2`}></i> {item.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
