import { useState, useRef, useEffect } from "react";
import { DarkThemeToggle } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="./src/assets/images/ecommerceLogo.jpg"
            className="h-10 rounded-full"
            alt="Ecommerce"
          />
          <span className="self-center text-3xl font-extrabold text-gray-900 dark:text-white whitespace-nowrap">
            Ecommerce
          </span>
        </a>

        <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 text-gray-900 dark:text-white"
            >
              <span>Profile</span>
              <i className="uil uil-angle-down"></i>
            </button>
            {isOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800">
                <Link
                  to="/login"
                  onClick={(e) => e.stopPropagation()}
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                >
               <i className="uil uil-signin"></i>   Login
                </Link>
                <Link
                  to="/register"
                  onClick={(e) => e.stopPropagation()}
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                >
                  <i className="uil uil-user-plus"></i>  Register
                </Link>
                <Link
                  to="/cart"
                  onClick={(e) => e.stopPropagation()}
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                >
                 <i className="uil uil-shopping-bag"></i>   Cart (0)
                </Link>
              </div>
            )}
          </div>
          {/* Theme toggle button */}
          <DarkThemeToggle className="mx-2" />
        </div>

        <div className="items-center justify-between w-full md:w-auto md:order-1">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-indigo-600 md:p-0 dark:text-white md:dark:hover:text-indigo-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <i className="uil uil-estate"></i> Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-indigo-600 md:p-0 dark:text-white md:dark:hover:text-indigo-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <i className="uil uil-info-circle"></i> About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-indigo-600 md:p-0 dark:text-white md:dark:hover:text-indigo-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <i className="uil uil-at"></i> Contact
              </Link>
            </li>
            <li>
              <Link
                to="/policy"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-indigo-600 md:p-0 dark:text-white md:dark:hover:text-indigo-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <i className="uil uil-file-info-alt"></i> Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
