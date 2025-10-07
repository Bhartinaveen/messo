import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- SVG Icons ---
const FiSearch = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FiHeart = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
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
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
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
      className="relative shadow-md z-10"
      style={{ background: 'linear-gradient(to right, #D8D6F5, #B2B0E8, #D8D6F5)' }}
    >
      {/* Keep navbar height slim */}
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">

        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 shadow-md flex-shrink-0">
              <img
                src="/image/logo.png" // Update path if needed
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <Link to="/" className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
            Fts Shopping
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-8 font-medium text-gray-700 text-sm">
          <li><Link to="/" className="hover:text-gray-900 transition">Home</Link></li>
          <li><Link to="/explore" className="hover:text-gray-900 transition">Explore</Link></li>
          <li><Link to="/contact" className="hover:text-gray-900 transition">Contact</Link></li>
          <li><Link to="/about" className="hover:text-gray-900 transition">About</Link></li>
          <li><Link to="/register" className="hover:text-gray-900 transition">Sign Up</Link></li>
        </ul>

        {/* Desktop Search & Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center bg-white rounded-md px-2 py-1">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-40 placeholder-gray-600"
            />
            <FiSearch className="text-gray-600 cursor-pointer h-5 w-5" />
          </div>
          <FiHeart className="text-gray-800 w-5 h-5 hover:text-red-500 cursor-pointer" />
          <div className="relative">
            <FiShoppingCart className="text-gray-800 w-5 h-5 cursor-pointer" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <div className="relative mr-3">
            <FiShoppingCart className="text-gray-800 w-6 h-6 cursor-pointer" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800">
            {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full shadow-lg"
          style={{ background: 'linear-gradient(to right, #D8D6F5, #B2B0E8, #D8D6F5)' }}
        >
          <ul className="flex flex-col items-center space-y-4 py-4 font-medium text-gray-700">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/explore" onClick={() => setIsMenuOpen(false)}>Explore</Link></li>
            <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
            <li><Link to="/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navebar;
