import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {  FaCartPlus, FaInfo, FaAt, FaFileAlt, FaHome, FaArrowCircleDown, FaSignInAlt, FaLockOpen, FaUser, FaSignOutAlt, FaClipboard, FaUserPlus } from "react-icons/fa";
import { Badge } from 'antd';
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
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
      <NavLink to={`/dashboard/${auth?.user?.isAdmin == 0 ? "user" : "admin"}`} className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/src/assets/images/ecommerceLogo.jpg" className="shadow-lg h-10 rounded-full" alt="Ecommerce" />
        <span className="self-center text-3xl font-extrabold text-gray-900 dark:text-white whitespace-nowrap">Ecommerce</span>
      </NavLink>
  
      {/* Center Menu for large/medium screens */}
      <div className="font-bold hidden md:flex flex-grow justify-center space-x-1">
        {['/', '/about', '/contact', '/policy'].map((path, index) => (
          <NavLink key={index} to={path} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 transition duration-200" onClick={closeMenu}>
            {index === 0 && <FaHome className="text-orange-500 inline-block" />}
            {index === 1 && <FaInfo className="text-orange-500 inline-block" />}
            {index === 2 && <FaAt className="text-orange-500 inline-block" />}
            {index === 3 && <FaFileAlt className="text-orange-500 inline-block" />}
            {path.replace('/', '') || 'Home'}
          </NavLink>
        ))}
      </div>
  
      {/* Right section with dropdown and theme toggle */}
      <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
      <Badge count={`${cart?.length} +`} showZero offset={[-10, 10]}>
    <NavLink  to="/cart" className="rounded font-bold block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 transition duration-200">
      <FaCartPlus className="text-orange-500 inline-block text-2xl" />
    </NavLink>
  </Badge>
  
        <div className="relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="font-bold flex items-center space-x-2 text-gray-900 dark:text-white">
            <FaUser Alt className="text-orange-500 inline-block text-1xl" /> Profile <FaArrowCircleDown className="text-orange-500 inline-block" />
          </button>
          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800 transition duration-200">
              {!auth.user ? (
                <>
                  <NavLink to="/login" className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 transition duration-200" onClick={(e) => e.stopPropagation()}>
                    <FaSignInAlt className="text-orange-500 inline-block" /> Login
                  </NavLink>
                  <hr />
                  <NavLink to="/register" className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 transition duration-200" onClick={(e) => e.stopPropagation()}>
                    <FaUserPlus className="text-orange-500 inline-block" /> Register
                  </NavLink>
                  <hr />
                  <NavLink to="/forgot-password" className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 transition duration-200" onClick={(e) => e.stopPropagation()}>
                    <FaLockOpen className="text-orange-500 inline-block" /> Reset Password
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/profile" className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 transition duration-200" onClick={(e) => e.stopPropagation()}>
                    <FaUser className="text-orange-500 inline-block" /> Profile
                  </NavLink>
                  <hr />
                  <NavLink to={`/dashboard/${auth.user.isAdmin == 0 ? "user" : "admin"}`} className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 transition duration-200" onClick={(e) => e.stopPropagation()}>
                    <FaClipboard className="text-orange-500 inline-block" /> {auth.user.isAdmin == 0 ? " User" : " Admin"} Dashboard
                  </NavLink>
                  <hr />
                  <NavLink onClick={handleLogout} to="/" className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 transition duration-200">
                    <FaSignOutAlt className="text-orange-500 inline-block" /> Logout
                  </NavLink>
                </>
              )}
            </div>
          )}
        </div>
  
        <ThemeToggle />
      </div>
  
      {/* Center Menu for small screens */}
      <button onClick={toggleMenu} className="md:hidden flex items-center">
        <i className={`uil ${menuOpen ? 'uil-times' : 'uil-bars'} dark:text-gray-100 text-2xl`}></i>
      </button>
      {menuOpen && (
        <div id="menu" className="absolute top-0 left-0 w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50">
          <ul className="flex flex-col space-y-2">
            {['/', '/about', '/contact', '/policy'].map((path, index) => (
              <li key={index}>
                <NavLink to={path} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 transition duration-200" onClick={closeMenu}>
                  {index === 0 && <FaHome className="text-orange-500 inline-block" />}
                  {index === 1 && <FaInfo className="text-orange-500 inline-block" />}
                  {index === 2 && <FaAt className="text-orange-500 inline-block" />}
                  {index === 3 && <FaFileAlt className="text-orange-500 inline-block" />}
                  {path.replace('/', '') || 'Home'}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </nav>
  );
}
