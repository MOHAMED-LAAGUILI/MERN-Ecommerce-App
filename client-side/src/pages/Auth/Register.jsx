import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/auth";

export default function Register() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.REACT_APP_API;

  // context session
  const  [auth] = useAuth();


  // add the loading to form btn
  const [loading, setLoading] = useState(false);

  // show hide pass
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


 
// add btn that generate random password
  const generatePassword = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 12;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber +1);
    }
    setValue("password", password);
    setShowPassword(true);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/v1/auth/register`, data);
      if (res && res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Registration failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (auth.user) {
    return navigate("/");
   }

  return (
    <Layout title="Register"  description="User registration page">
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 pt-10"  style={{ minHeight: "79.5vh" }}>
        <div className="flex-grow flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white px-8 py-4 rounded shadow-md w-full max-w-2xl dark:bg-gray-800"
          >
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Register</h1>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">


  {/* Username Field */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="username">
      Username
    </label>
    <input
      type="text"
      id="username"
      {...register("username", {
        required: "Username is required",
        minLength: { value: 3, message: "Username must be at least 3 characters long" },
      })}
      className={`dark:text-white mt-1 block w-full p-2 border ${errors.username ? "border-red-500" : "border-gray-300"} rounded-md focus:ring focus:ring-blue-500 dark:bg-gray-700`}
    />
    {errors.username && <p className="text-red-500 text-xs mt-1"><i className="uil uil-exclamation-triangle"></i> {errors.username.message}</p>}
  </div>

  {/* Email Field */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
      Email
    </label>
    <input
      type="email"
      id="email"
      autoComplete="username"
      {...register("email", {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Invalid email address",
        },
      })}
      className={`dark:text-white mt-1 block w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:ring focus:ring-blue-500 dark:bg-gray-700`}
    />
    {errors.email && <p className="text-red-500 text-xs mt-1"><i className="uil uil-exclamation-triangle"></i> {errors.email.message}</p>}
  </div>
 {/* Password Field */}
 <div className="col-span-1 md:col-span-2 mb-4">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
      Password
    </label>
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <div className="relative flex-grow">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters long" },
          })}
          className={`dark:text-white mt-1 block w-full p-2 pr-10 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-md focus:ring focus:ring-blue-500 dark:bg-gray-700`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        >
          <i className={`uil ${showPassword ? "uil-eye-slash" : "uil-eye"} text-gray-500 text-2xl me-2`}></i>
        </button>
      </div>

      <button
        type="button"
        onClick={generatePassword}
        className="mt-1 sm:mt-0 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-300"
      >
        Generate
      </button>
    </div>
    {errors.password && (
      <p className="text-red-500 text-xs mt-1">
        <i className="uil uil-exclamation-triangle"></i> {errors.password.message}
      </p>
    )}
  </div>

  {/* Answer Field */}
  <div className="col-span-1 md:col-span-2 mb-4">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="answer">
      <i className="uil uil-exclamation-triangle"></i>Special Keywords for Password Recovery
    </label>
    <input
      type="text"
      id="answer"
      {...register("answer", {
        required: "Answer is required",
        minLength: { value: 5, message: "Answer must be at least 5 characters long" },
      })}
      className={`dark:text-white mt-1 block w-full p-2 border ${
        errors.answer ? "border-red-500" : "border-gray-300"
      } rounded-md focus:ring focus:ring-blue-500 dark:bg-gray-700`}
    />
    {errors.answer && (
      <p className="text-red-500 text-xs mt-1">
        <i className="uil uil-exclamation-triangle"></i> {errors.answer.message}
      </p>
    )}
  </div>

    {/* Phone Field */}
    <div className="col-span-1 md:col-span-2 mb-4">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="phone">
     phone
    </label>
    <input
      type="text"
      id="phone"
      {...register("phone", {
        required: "Phone is required",
      })}
      className={`dark:text-white mt-1 block w-full p-2 border ${
        errors.answer ? "border-red-500" : "border-gray-300"
      } rounded-md focus:ring focus:ring-blue-500 dark:bg-gray-700`}
    />
    {errors.phone && (
      <p className="text-red-500 text-xs mt-1">
        <i className="uil uil-exclamation-triangle"></i> {errors.phone.message}
      </p>
    )}
  </div>




              {/* Address Fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="street">
                  Street Address
                </label>
                <input
                  type="text"
                  id="street"
                  {...register("street", { required: "Street address is required" })}
                  className={`dark:text-white mt-1 block w-full p-2 border ${errors.street ? "border-red-500" : "border-gray-300"} rounded-md focus:ring focus:ring-blue-500 dark:bg-gray-700`}
                />
                {errors.street && <p className="text-red-500 text-xs mt-1"><i className="uil uil-exclamation-triangle"></i> {errors.street.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="city">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("city", { required: "City is required" })}
                  className={`dark:text-white mt-1 block w-full p-2 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-md focus:ring focus:ring-blue-500 dark:bg-gray-700`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1"><i className="uil uil-exclamation-triangle"></i> {errors.city.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="state">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  {...register("state", { required: "State is required" })}
                  className={`dark:text-white mt-1 block w-full p-2 border ${errors.state ? "border-red-500" : "border-gray-300"} rounded-md focus:ring focus:ring-blue-500 dark:bg-gray-700`}
                />
                {errors.state && <p className="text-red-500 text-xs mt-1"><i className="uil uil-exclamation-triangle"></i> {errors.state.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="zip">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip"
                  {...register("zip", { required: "Zip code is required" })}
                  className={`dark:text-white mt-1 block w-full p-2 border ${errors.zip ? "border-red-500" : "border-gray-300"} rounded-md focus:ring focus:ring-blue-500 dark:bg-gray-700`}
                />
                {errors.zip && <p className="text-red-500 text-xs mt-1"><i className="uil uil-exclamation-triangle"></i> {errors.zip.message}</p>}
              </div>
            </div>

            {/* Submit and Reset Buttons */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => reset()}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              >
             <i className="uil uil-history-alt"></i>   Reset
              </button>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                disabled={loading}
              >
               <i className="uil uil-user-plus"></i> {loading ? "Registering..." : "Register"}
              </button>

            </div>

            <div className="dark:text-white mt-4 text-center">
                Already have an account?  
              <Link to="/login" className="font-bold text-blue-500 hover:underline">
                {" "} Log in here<i className="uil uil-forward"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
