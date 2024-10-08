import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Add Link for navigation
import { useState } from "react";
import { useAuth } from "../../context/auth.jsx";


export default function Login() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.REACT_APP_API;
  const [loading, setLoading] = useState(false);
const  [auth ,setAuth] = useAuth();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/v1/auth/login`, data);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        })

        localStorage.setItem("auth", JSON.stringify(res.data));
      

        setTimeout(() => {
          navigate("/"); // Redirect to homepage after login
        }, 2000); // Delay of 2 seconds for toast to finish
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message;
      toast.error(`Login failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Login">
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 py-48 " >
        <div className="flex-grow flex items-center justify-center py-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-8 rounded shadow-md w-full max-w-md dark:bg-gray-800"
          >
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              Login
            </h1>

            {/* Email Field */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="email"
              >
                Email
              </label>
              <input
              autoComplete 
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className={`mt-1 block w-full p-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="password"
              >
                Password
              </label>
              <input
               autoComplete 
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                className={`mt-1 block w-full p-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-blue-600"
              } text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-200`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Sign Up Link */}
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Dont have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
