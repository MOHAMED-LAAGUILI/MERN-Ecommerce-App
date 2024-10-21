import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserProfileDashboard from "./User_Profile_Dashboard";
import { FaLockOpen, FaPhone } from 'react-icons/fa';


const UserProfile = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  


  // Return loading state or empty message if auth.user is not available
  if (!auth || !auth.user) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg">Loading profile data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`flex flex-col md:flex-row `}>
        {/* Sidebar */}
        <aside className="dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-900 w-full md:w-64 h-auto md:h-screen p-4 shadow-lg md:sticky md:top-0 overflow-hidden">
        <UserProfileDashboard />
      </aside>
        {/* Main Content */}
        <main className="flex-1 p-6 dark:bg-gray-800  dark:text-white">
          <div className="flex justify-between items-center mb-4 ">
            <h1 className="text-2xl font-semibold">Profile</h1>
    
          </div>

          {/* Profile Fields */}
          <label className="inline-block mb-2">Username:</label>
          <input
            type="text"
            value={auth.user.username}
            className="dark:bg-gray-700 w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            disabled 
          />

          <label className="block mb-2">Email:</label>
          <input
            type="text"
            value={auth.user.email}
            className="dark:bg-gray-700 w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            disabled 
          />

          <label className="block mb-2">Secret Word:</label>
          <div className="flex items-center mb-4">
            <FaLockOpen className="text-orange-500 text-xl mr-2" />
            <p>This is your secret word to reset your password. Memorize it.</p>
          </div>
          <input
            type="text"
            value={auth.user.answer}
            className="dark:bg-gray-700 w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            disabled 
          />

          <label className="flex items-center mb-2">
            <FaPhone className="text-orange-500 text-xl mr-2" />
            Phone:
          </label>
          <input
            type="text"
            value={auth.user.phone}
            className="dark:bg-gray-700 w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            disabled
          />

          {/* Other fields like street, city, state, and zip */}
          <label className="block mb-2">Street:</label>
          <input
            type="text"
            value={auth.user.street}
            className="dark:bg-gray-700 w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            disabled 
          />

          <label className="block mb-2">City:</label>
          <input
            type="text"
            value={auth.user.city}
            className="dark:bg-gray-700 w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            disabled
          />

          <label className="block mb-2">State:</label>
          <input
            type="text"
            value={auth.user.state}
            className="dark:bg-gray-700 w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            disabled 
          />

          <label className="block mb-2">Zip:</label>
          <input
            type="text"
            value={auth.user.zip}
            className="dark:bg-gray-700 w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            disabled 
          />

          {/* Update Button */}
          <button
            type="button"
            onClick={() => navigate('/update-profile')}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Update Data
          </button>
        </main>
      </div>
    </Layout>
  );
};

export default UserProfile;
