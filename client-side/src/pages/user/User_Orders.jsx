import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import UserProfileDashboard from "./User_Profile_Dashboard";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.REACT_APP_API;

  useEffect(() => {
    const { user } = auth;
    if (user) {
      setUsername(user.username || "");
      setPhone(user.phone || "");
      setStreet(user.street || "");
      setCity(user.city || "");
      setState(user.state || "");
      setZip(user.zip || "");
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !phone || !street || !city || !state || !zip) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.put(
        `${apiUrl}/api/v1/auth/update-profile`,
        { username, phone, street, city, state, zip },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        }
      );

      if (data.success) {
        setAuth({ ...auth, user: data.user });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.user;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Full error object:", error);
      toast.error(`Update failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 h-auto md:h-screen bg-gray-800 text-white p-4 shadow-lg md:sticky md:top-0">
        <UserProfileDashboard />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-semibold mb-4">Update Profile</h1>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg">
            <label className="block mb-2">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
            <label className ="block mb-2">Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
            <label className="block mb-2">Street:</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
            <label className="block mb-2">City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
            <label className="block mb-2">State:</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
            <label className="block mb-2">Zip:</label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </main>
      </div>
    </Layout>
  );
};

export default Profile;