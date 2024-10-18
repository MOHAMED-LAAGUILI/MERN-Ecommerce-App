import { useState, useRef, useEffect } from "react";
import { DarkThemeToggle } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {  FaInfo, FaAt, FaFileAlt, FaHome,  FaUserAlt, FaArrowCircleDown } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
      if (menuOpen && !event.target.closest("#menu")) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, menuOpen]);

  const LOGIN_PATH = "/login";
  const handleLogout = () => {
    try {
      setAuth({ user: null, token: null });
      localStorage.removeItem("auth");
      toast.success("Logout Successfully");
      navigate(LOGIN_PATH);
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={`/dashboard/${auth?.user?.isAdmin == 0 ? "user" : "admin"}`} className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/src/assets/images/ecommerceLogo.jpg" className="h-10 rounded-full" alt="Ecommerce" />
          <span className="self-center text-3xl font-extrabold text-gray-900 dark:text-white whitespace-nowrap">Ecommerce</span>
        </Link>

        {/* Center Menu for large/medium screens */}
        <div className="hidden md:flex flex-grow justify-center space-x-8">
      
                <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700" onClick={closeMenu}>
                <FaHome className="text-orange-500 inline-block mr-2" /> Home
                </Link>
            
                <Link to="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700" onClick={closeMenu}>
                <FaInfo className="text-orange-500 inline-block mr-2" /> About
                </Link>
            
                <Link to="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700" onClick={closeMenu}>
                <FaAt className="text-orange-500 inline-block mr-2" /> Contact
                </Link>
              
                <Link to="/policy" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700" onClick={closeMenu}>
                <FaFileAlt className="text-orange-500 inline-block mr-2" /> Policy
                </Link>
              
        </div>

        {/* Right section with dropdown and theme toggle */}
        <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="font-bold flex items-center space-x-2 text-gray-900 dark:text-white">
              <span>
              <FaUserAlt className="text-orange-500 inline-block text-1xl" /> Profile  <FaArrowCircleDown className="text-orange-500 inline-block mr-2" /> 
              </span>
            </button>
            {isOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800">
                {!auth.user ? (
                  <>
                    <Link to="/login" onClick={(e) => e.stopPropagation()} className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                      <i className="uil uil-signin"></i> Login
                    </Link>
                    <hr />
                    <Link to="/register" onClick={(e) => e.stopPropagation()} className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                      <i className="uil uil-user-plus"></i> Register
                    </Link>
                    <hr />
                    <Link to="/forgot-password" onClick={(e) => e.stopPropagation()} className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                      <i className="uil uil-key-skeleton"></i> Reset Password
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile" onClick={(e) => e.stopPropagation()} className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                      <i className="uil uil-user"></i> Profile
                    </Link>
                    <hr />
                    <Link to={`/dashboard/${auth.user.isAdmin == 0 ? "user" : "admin"}`} onClick={(e) => e.stopPropagation()} className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                      <i className="uil uil-comparison"></i>{auth.user.isAdmin == 0 ? " User" : " Admin"} Dashboard
                    </Link>
                    <hr />
                    <Link to="/cart" onClick={(e) => e.stopPropagation()} className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                      <i className="uil uil-shopping-bag"></i> Cart (0)
                    </Link>
                    <hr />
                    <Link onClick={handleLogout} to="/login" className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                      <i className="uil uil-signout"></i> Logout
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <DarkThemeToggle className="mx-2" />
        </div>

        {/* Center Menu for small screens */}
        <button onClick={toggleMenu} className=" md:hidden flex items-center">
          <i className={`uil ${menuOpen ? 'uil-times' : 'uil-bars'} dark:text-gray-100 text-2xl`}></i>
        </button>
        {menuOpen && (

          <div id="menu" className="absolute top-0 left-0 w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700" onClick={closeMenu}>
                <FaHome className="text-orange-500 inline-block mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700" onClick={closeMenu}>
                <FaInfo className="text-orange-500 inline-block mr-2" /> About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700" onClick={closeMenu}>
                <FaAt className="text-orange-500 inline-block mr-2" /> Contact
                </Link>
              </li>
              <li>
                <Link to="/policy" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700" onClick={closeMenu}>
                <FaFileAlt className="text-orange-500 inline-block mr-2" /> Policy
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
