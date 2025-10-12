import React, { useState } from "react";
import { Link } from "react-router-dom";

// --- SVG Icons ---
const FiSearch = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FiHeart = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67
      l-1.06-1.06a5.5 5.5 0 0 0-7.78 
      7.78l1.06 1.06L12 21.23l7.78-7.78 
      1.06-1.06a5.5 5.5 0 0 0 
      0-7.78z"></path>
  </svg>
);

const FiShoppingCart = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 
      0 2 1.61h9.72a2 2 0 0 0 
      2-1.61L23 6H6"></path>
  </svg>
);

const FiMenu = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const FiX = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- Navbar Component ---
const Navebar = () => {
  const cartItemCount = 5;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className="relative shadow-md z-50"
      style={{ background: "linear-gradient(to right, #D8D6F5, #B2B0E8, #D8D6F5)" }}
    >
      {/* Navbar Row */}
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
              <img
                src="/image/logo.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <Link
            to="/"
            className="text-base md:text-lg font-bold text-gray-800 leading-tight"
          >
            Fts Shopping
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-6 font-medium text-gray-700 text-sm">
          <li><Link to="/" className="hover:text-gray-900 transition">Home</Link></li>
          <li><Link to="/explore" className="hover:text-gray-900 transition">Explore</Link></li>
          <li><Link to="/contact" className="hover:text-gray-900 transition">Contact</Link></li>
          <li><Link to="/about" className="hover:text-gray-900 transition">About</Link></li>
          <li><Link to="/register" className="hover:text-gray-900 transition">Sign Up</Link></li>
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center bg-white rounded-md px-2 py-1">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-32 placeholder-gray-600"
            />
            <FiSearch className="text-gray-600 cursor-pointer h-4 w-4" />
          </div>
          <FiHeart className="text-gray-800 w-5 h-5 hover:text-red-500 cursor-pointer" />
          <div className="relative">
            <FiShoppingCart className="text-gray-800 w-5 h-5 cursor-pointer" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <div className="relative mr-2">
            <FiShoppingCart className="text-gray-800 w-5 h-5 cursor-pointer" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu (Logo removed) */}
      <div
        className={`fixed top-0 right-0 h-[80vh] w-[65%] max-w-[220px] rounded-l-xl shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ background: "linear-gradient(to bottom, #D8D6F5, #B2B0E8)" }}
      >
        {/* Close Button Only */}
        <div className="flex justify-end px-3 py-2 border-b border-gray-300">
          <button onClick={() => setIsMenuOpen(false)}>
            <FiX size={22} className="text-gray-800" />
          </button>
        </div>

        {/* Menu Links */}
        <ul className="flex flex-col items-start pl-4 space-y-3 py-4 font-medium text-gray-700 text-sm">
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/explore" onClick={() => setIsMenuOpen(false)}>Explore</Link></li>
          <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link to="/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navebar;
