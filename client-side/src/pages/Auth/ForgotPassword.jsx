import Layout from "../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Add Link for navigation
import { useState} from "react";
import { useAuth } from "../../context/auth";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.REACT_APP_API;
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/api/v1/auth/forgot-password`,
        data
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        // add me a navigate to login after 2sec of delay
        setTimeout(() => {
          navigate("/login");
        }, 2000); 
    
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      
      toast.error(`Reset Field : ${error.response?.data?.message} ${error} ${ error.message}`);
    } finally {
      setLoading(false);
    }
  };



 
  return (
    <Layout title={"Forgot Password"}>
      <div
        className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 "
        style={{ minHeight: "79.5vh" }}
      >
        <div className="flex-grow flex items-center justify-center py-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-8 rounded shadow-md w-full max-w-md dark:bg-gray-800 rounded"
          >
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              Reset Password
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

            {/* Answer Field */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="answer"
              >
                What was your favorite sport ?
              </label>
              <input
                autoComplete
                type="text"
                id="answer"
                {...register("answer", {
                  required: "answer is required",
                  minLength: {
                    value: 5,
                    message: "answer must be at least 5 characters long",
                  },
                })}
                className={`mt-1 block w-full p-2 border ${
                  errors.answer ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700`}
              />
              {errors.answer && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.answer.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                autoComplete
                type="password"
                id="newPassword"
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                className={`mt-1 block w-full p-2 border ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700`}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPassword.message}
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
              {loading ? "Reseting..." : "Reset Password"}
            </button>
            {!auth.user ? (
<>
 {/* Sign Up Link */}
 <div className="mt-4 text-center">
              <span className="text-sm text-gray-700 dark:text-gray-300">
               Did you Remember your password ? Try to{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-bold  hover:underline dark:text-blue-400"
                >
                  Login
                </Link>
                <br />
                or create new one ? Try to{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-bold hover:underline dark:text-blue-400"
                >
                  Signup
                </Link>
              </span>
            </div>
</>

            ) : (

 <div className="mt-4 text-center">
 <span className="text-sm text-gray-700 dark:text-gray-300">
   <Link
     to="/profile"
     className="text-blue-600 font-bold  hover:underline dark:text-blue-400"
   >
    <i className="uil uil-backward"></i> Back to Profile
   </Link>
 </span>
</div>

            )}
           
          </form>
        </div>
      </div>
    </Layout>
  );
}
