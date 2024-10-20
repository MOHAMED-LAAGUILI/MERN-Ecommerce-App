import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const UserSettings = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.REACT_APP_API;

  useEffect(() => {
    const { user } = auth;
    if (user) {
      setEmail(user.email || "");
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.put(
        `${apiUrl}/api/v1/auth/update-settings`,
        { email, password },
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
    <div>
      <h1 className="text-2xl font-semibold mb-4">Update Settings</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg">
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
        />
        <label className="block mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
        />
        <label className="block mb-2">Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          {loading ? "Updating..." : "Update Settings"}
        </button>
      </form>
    </div>
  );
};

export default UserSettings;