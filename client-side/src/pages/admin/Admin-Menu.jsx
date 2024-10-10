import { Link } from "react-router-dom";

export default function AdminMenu() {
  return (
    <div className="bg-gradient-to-b from-purple-800 to-purple-900 text-gray-100 rounded-xl p-6 space-y-6 shadow-sm">
      <h2 className="text-3xl font-semibold flex items-center mb-6">
        <i className="uil uil-dashboard mr-3 text-3xl"></i> Admin Panel
      </h2>

      <div className="space-y-4">
        <Link
          to="/dashboard/admin/create-categories"
          className="flex items-center p-4 rounded-lg shadow-md border-2  transition-all duration-300 transform hover:scale-105"
        >
          <i className="uil uil-layer-group text-2xl mr-3"></i>
          <span className="text-lg  transition-all">Create Category</span>
        </Link>

        <Link
          to="/dashboard/admin/create-products"
          className="flex items-center p-4 rounded-lg shadow-md border-2  transition-all duration-300 transform hover:scale-105"
        >
          <i className="uil uil-plus-circle text-2xl mr-3"></i>
          <span className="text-lg">Create Product</span>
        </Link>

        <Link
          to="/dashboard/admin/users"
          className="flex items-center p-4 rounded-lg shadow-md border-2 transition-all duration-300 transform hover:scale-105"
        >
          <i className="uil uil-users-alt text-2xl mr-3"></i>
          <span className="text-lg">Manage Users</span>
        </Link>

        <Link
          to="/dashboard/admin/orders"
          className="flex items-center p-4 rounded-lg shadow-md border-2  transition-all duration-300 transform hover:scale-105"
        >
          <i className="uil uil-shopping-cart text-2xl mr-3"></i>
          <span className="text-lg">Manage Orders</span>
        </Link>
      </div>
    </div>
  );
}
