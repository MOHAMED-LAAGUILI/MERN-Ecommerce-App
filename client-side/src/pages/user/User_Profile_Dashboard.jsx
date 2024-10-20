import { Link } from "react-router-dom";
import { FaConfluence, FaFirstOrder, FaUser, FaUserEdit, FaUserSecret } from 'react-icons/fa';

export default function UserProfileDashboard() {
  return (
    <>
     <aside className="dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-900 w-full md:w-64 h-auto md:h-screen bg-gray-800 p-4 shadow-lg md:sticky md:top-0">
      
   <div className=" flex h-[100svh] w-60 flex-col overflow-y-auto bg-slate-50 pt-8 dark:border-slate-700 dark:bg-slate-900 sm:h-[100vh] sm:w-64">
    <div className="flex px-4">
      {/* Logo */}
      
      <h2 className="px-5 text-lg font-medium  dark:text-gray-100">
 Profile Dashboard
       </h2>
    </div>
   
    <div className="mt-auto w-full space-y-4 px-2 py-4">
      <button className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800">
     <FaUser className={"text-orange-500 text-2xl me-2"}/>
      <Link to="/profile" className="hover:text-gray-400 transition-colors duration-300">Profile</Link>
        
      </button>
      <button className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800">
      <FaUserEdit className={"text-orange-500 text-2xl me-2"}/>
      <Link to="/update-profile" className="hover:text-gray-400 transition-colors duration-300">Update Profile</Link>
        
      </button>
      <button className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800">
      <FaFirstOrder className={"text-orange-500 text-2xl me-2"}/>
      <Link to="/update-profile" className="hover:text-gray-400 transition-colors duration-300">Orders</Link>
        
      </button>
      <button className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800">
      <FaConfluence className={"text-orange-500 text-2xl me-2"}/>
      <Link to="/update-profile" className="hover:text-gray-400 transition-colors duration-300">Settings</Link>
        
      </button>
      <button className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800">
      <FaUserSecret className={"text-orange-500 text-2xl me-2"}/>
      <Link to="/update-profile" className="hover:text-gray-400 transition-colors duration-300">Reset Password</Link>
        
      </button>
    </div>
  </div>
  </aside>
    </>
  );
}
