import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { FaCartPlus, FaInfo, FaAt, FaFileAlt, FaHome, FaArrowCircleDown, FaSignInAlt, FaUser, FaSignOutAlt, FaClipboard, FaUserPlus, FaLockOpen } from "react-icons/fa";
import { Badge } from 'antd';
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  const toggleMenu = () => setMenuOpen(prevState => !prevState);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest("#menuButton")) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  const menuItems = [
    { path: '/', icon: <FaHome />, label: 'Home' },
    { path: '/about', icon: <FaInfo />, label: 'About' },
    { path: '/contact', icon: <FaAt />, label: 'Contact' },
    { path: '/policy', icon: <FaFileAlt />, label: 'Policy' },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center space-x-3">
          <img src="/src/assets/images/ecommerceLogo.jpg" className="h-10 rounded-full" alt="Ecommerce" />
          <span className="text-3xl font-extrabold text-orange-500">Ecommerce</span>
        </NavLink>
  
        {/* Center Menu */}
        <div className="hidden md:flex space-x-4">
          {menuItems.map(({ path, icon, label }) => (
            <NavLink key={path} to={path} className="flex items-center space-x-1 text-white hover:text-orange-500 transition duration-200">
              
              <div className=" flex inline-block">{icon} {label}</div>
            </NavLink>
          ))}
        </div>
  
        {/* Right section */}
        <div className="flex items-center space-x-4">
          <Badge count={`${cart?.length || 0}`} offset={[-5, 5]}>
            <NavLink to="/cart" className="text-white hover:text-orange-500 transition duration-200">
              <FaCartPlus className="text-3xl" />
            </NavLink>
          </Badge>
  
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="flex items-center space-x-1 text-white hover:text-orange-500">
              <FaUser />
              <span>Profile</span>
              <FaArrowCircleDown />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
                {!auth.user ? (
                  <>
                    <NavLink to="/login" className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-200" onClick={closeDropdown}>
                      <FaSignInAlt className="inline-block mr-2" /> Login
                    </NavLink>
                    <NavLink to="/register" className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-200" onClick={closeDropdown}>
                      <FaUserPlus className="inline-block mr-2" /> Register
                    </NavLink>
                    <NavLink to="/forgot-password" className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-200" onClick={closeDropdown}>
                      <FaLockOpen className="inline-block mr-2" /> Reset Password
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/profile" className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-200" onClick={closeDropdown}>
                      <FaUser className="inline-block mr-2" /> Profile
                    </NavLink>
                    <NavLink to={`/dashboard/${auth.user.isAdmin ? "admin" : "user"}`} className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-200" onClick={closeDropdown}>
                      <FaClipboard className="inline-block mr-2" /> Dashboard
                    </NavLink>
                    <button onClick={() => { handleLogout(); closeDropdown(); }} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition duration-200">
                      <FaSignOutAlt className="inline-block mr-2" /> Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
  
          <ThemeToggle />
        </div>
  
        {/* Mobile menu button */}
        <button id="menuButton" onClick={toggleMenu} className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>
  
      {/* Mobile menu */}
      {menuOpen && (
        <div ref={menuRef} className="md:hidden bg-gray-800" id="menu">
          {menuItems.map(({ path, icon, label }) => (
            <NavLink key={path} to={path} className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-200" onClick={closeMenu}>
              {icon}
              <span className="ml-2">{label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
