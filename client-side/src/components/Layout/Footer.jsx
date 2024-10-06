import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold dark:text-white">Ecommerce</h2>
            <p className="text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Ecommerce. All rights reserved.
            </p>
          </div>
          <ul className="flex flex-col md:flex-row mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-8 rtl:space-x-reverse">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/policy" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}