import React, { useState } from 'react';

// --- SVG Icons ---
// These are stateless functional components for rendering SVG icons.
// They accept props like 'className' for styling.

const FiSearch = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FiHeart = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const FiShoppingCart = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const FiMenu = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const FiX = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- Navbar Component ---
const Navebar = () => {
  // State for cart items count
  const cartItemCount = 5;
  // State to manage the mobile menu's open/close status
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // The main navigation container. Using a linear gradient for the background.
    <nav className="relative shadow-md z-10" style={{ background: 'linear-gradient(to right, #D8D6F5, #B2B0E8, #D8D6F5)' }}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="text-3xl font-bold text-gray-800">
          Exclusive
        </div>

        {/* Desktop Links - Hidden on screens smaller than medium */}
        <ul className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          <li className="border-b-2 border-transparent hover:border-gray-800 hover:text-gray-900 transition-all duration-300 cursor-pointer">Home</li>
          <li className="border-b-2 border-transparent hover:border-gray-800 hover:text-gray-900 transition-all duration-300 cursor-pointer">Contact</li>
          <li className="border-b-2 border-transparent hover:border-gray-800 hover:text-gray-900 transition-all duration-300 cursor-pointer">About</li>
          <li className="border-b-2 border-transparent hover:border-gray-800 hover:text-gray-900 transition-all duration-300 cursor-pointer">Sign Up</li>
        </ul>

        {/* Desktop Search & Icons - Hidden on screens smaller than medium */}
        <div className="hidden md:flex items-center space-x-5">
          <div className="flex items-center bg-white rounded-md px-3 py-2">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-transparent outline-none text-sm w-48 placeholder-gray-600"
            />
            <FiSearch className="text-gray-600 cursor-pointer h-5 w-5" />
          </div>
          <FiHeart className="text-gray-800 w-6 h-6 hover:text-red-500 transition-colors duration-300 cursor-pointer" />
          <div className="relative">
            <FiShoppingCart className="text-gray-800 w-6 h-6 hover:text-gray-900 transition-colors duration-300 cursor-pointer" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Menu Button & Cart - Visible only on screens smaller than medium */}
        <div className="md:hidden flex items-center">
            <div className="relative mr-4">
                <FiShoppingCart className="text-gray-800 w-6 h-6 cursor-pointer" />
                {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                    </span>
                )}
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800">
                {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu - Slides down from the top */}
      <div className={`md:hidden absolute top-full left-0 w-full shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'}`} style={{ background: 'linear-gradient(to right, #D8D6F5, #B2B0E8, #D8D6F5)' }}>
        {isMenuOpen && (
            <ul className="flex flex-col items-center space-y-4 py-6 font-medium text-gray-700">
                <li className="hover:text-gray-900 cursor-pointer">Home</li>
                <li className="hover:text-gray-900 cursor-pointer">Contact</li>
                <li className="hover:text-gray-900 cursor-pointer">About</li>
                <li className="hover:text-gray-900 cursor-pointer">Sign Up</li>
            </ul>
        )}
      </div>
    </nav>
  );
};

export default Navebar;
