import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export default function AdminMenu({ isModalOpen }) {
  return (
    <div className="dark:text-gray-100 bg-gradient-to-b from-purple-800 to-purple-900 text-gray-100 rounded-xl p-6 space-y-6 shadow-lg">
      <h2 className="text-4xl font-extrabold flex items-center mb-6">
        <i className="uil uil-dashboard mr-3 text-4xl"></i> Admin Panel
      </h2>

      <div className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-transparent transition-all duration-300 transform hover:scale-105 hover:border-purple-500"
            aria-hidden={isModalOpen ? "true" : "false"} // Adjust based on modal state
          >
            <i className={`${item.icon} text-2xl mr-3`}></i>
            <span className="text-lg font-medium transition-all">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const menuItems = [
  {
    label: "Create Category",
    path: "/dashboard/admin/crud-categories",
    icon: "uil uil-layer-group",
  },
  {
    label: "Create Product",
    path: "/dashboard/admin/create-products",
    icon: "uil uil-plus-circle",
  },
  {
    label: "Products List",
    path: "/dashboard/admin/list-products",
    icon: "uil uil-list-ul",
  },
  {
    label: "Manage Users",
    path: "/dashboard/admin/users",
    icon: "uil uil-users-alt",
  },
  {
    label: "Manage Orders",
    path: "/dashboard/admin/users-orders",
    icon: "uil uil-shopping-cart",
  },
];

AdminMenu.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
};
