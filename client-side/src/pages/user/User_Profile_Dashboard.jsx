import { Link } from "react-router-dom";
import { FaFirstOrder, FaUser, FaUserEdit, FaUserSecret } from 'react-icons/fa';

export default function UserProfileDashboard() {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-slate-50 pt-8 dark:border-slate-700 dark:bg-slate-900">
    <div className="flex px-4 mb-6">
      <h2 className="px-5 text-lg font-medium dark:text-gray-100">
        Profile Dashboard
      </h2>
    </div>
    
    <div className="mt-auto w-full space-y-4 px-2 py-4">
      <div className="flex items-center">
        <FaUser className="text-orange-500 text-2xl me-2" />
        <Link to="/profile" className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800">
          Profile
        </Link>
      </div>
      
      <div className="flex items-center">
        <FaUserEdit className="text-orange-500 text-2xl me-2" />
        <Link to="/update-profile" className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800">
          Update Profile
        </Link>
      </div>
      
      <div className="flex items-center">
        <FaFirstOrder className="text-orange-500 text-2xl me-2" />
        <Link to="/user-orders" className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800">
          Orders
        </Link>
      </div>
      
     
      <div className="flex items-center">
        <FaUserSecret className="text-orange-500 text-2xl me-2" />
        <Link to="/forgot-password" className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800">
          Reset Password
        </Link>
      </div>
    </div>
  </div>
  );
}
