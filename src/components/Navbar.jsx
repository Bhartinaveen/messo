import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";  
import { useWishlist } from "../context/WishlistContext"; 
import {
  BellIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { cart } = useCart();     
  const { wishlist } = useWishlist(); 
  const cartItemCount = cart.length;
  const wishlistCount = wishlist.length; 
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);


  useEffect(() => {
    const readUser = () => {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
      else setUser(null);
    };

    // initial read
    readUser();

    // update on navigation
    const unlisten = () => readUser();

    // update when profile saves (fires from MyProfile)
    window.addEventListener("user-updated", readUser);

    return () => {
      window.removeEventListener("user-updated", readUser);
    };
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 w-full shadow-lg z-50 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
      <div className="w-full px-4 py-3 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <div className="w-11 h-11 rounded-full overflow-hidden border-gray-300 shadow-lg">
              <img src="/image/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
          </Link>
          <Link to="/" className="text-2xl font-extrabold flex items-baseline">
            <span className="bg-clip-text text-transparent bg-black mr-1">First</span>
            <span className="flex items-baseline">
              <span className="bg-clip-text text-transparent bg-red-600">U</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-700">Shop</span>
            </span>
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            // Logged in: show only icons
            <>
              {/* NOTIFICATION ICON */}
              <div className="relative cursor-pointer ">
                <BellIcon className="w-6 h-6 text-white hover:text-red-600 transition" />
              </div>

              {/* WISHLIST ICON */}
              <div
                onClick={() => navigate("/wishlist")}
                className="relative cursor-pointer"
              >
                <HeartIcon className="w-7 h-7 text-white hover:text-red-600" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </div>

              {/* USER / PROFILE ICON (and Admin link if applicable) */}
              <div className="relative cursor-pointer">
                <div className="flex items-center gap-3">
                    {user.role === 'superadmin' ? (
                    <Link to="/admin" className="text-white text-sm px-3 py-1 rounded-md bg-black/20 hover:bg-black/30">Super Admin</Link>
                  ) : user.isAdmin ? (
                    <Link to="/admin" className="text-white text-sm px-3 py-1 rounded-md bg-black/20 hover:bg-black/30">Admin</Link>
                  ) : null}
                  {user.isMerchant && !user.isAdmin && (
                    <Link to="/merchant/dashboard" className="text-white text-sm px-3 py-1 rounded-md bg-black/20 hover:bg-black/30">Merchant</Link>
                  )}

                  {/* Show avatar if available */}
                  <Link to={user.isAdmin ? "/admin/profile" : user.isMerchant ? "/merchant/profile" : "/profile"} className="flex items-center gap-2">
                    {user.avatar ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <UserCircleIcon className="w-7 h-7 text-white hover:text-black" />
                    )}
                  </Link>
                </div>
              </div>

              {/* CART ICON */}
              <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                <ShoppingCartIcon className="w-7 h-7 text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </>
          ) : (
            // Not logged in: show full nav links + icons
            <>
              <ul className="flex items-center space-x-6 font-semibold text-white text-md">
                <li><Link to="/" className="hover:text-black">Home</Link></li>
                <li><Link to="/blog" className="hover:text-black">Blog</Link></li>
                <li><Link to="/about" className="hover:text-black">About</Link></li>
                <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
                
              <li
                  className="relative"
                  onMouseEnter={() => setShowLoginDropdown(true)}
                  onMouseLeave={() => setShowLoginDropdown(false)}
                >
                  <button className="hover:text-black flex items-center gap-1">
                    Login ▾
                  </button>

              {showLoginDropdown && (
                <div className="absolute top-8 right-0 bg-white text-black rounded-md shadow-lg w-44 py-2 z-50">
                  
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </Link>

                  <Link
                      to="/partner-auth"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Partner Login
                    </Link>

                  </div>
                )}
              </li>
            </ul>

              {/* NOTIFICATION ICON */}
              <div className="relative cursor-pointer ">
                <BellIcon className="w-6 h-6 text-white hover:text-red-600 transition" />
              </div>

              {/* WISHLIST ICON */}
              <div
                onClick={() => navigate("/wishlist")}
                className="relative cursor-pointer"
              >
                <HeartIcon className="w-7 h-7 text-white hover:text-red-600" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </div>

              {/* USER / LOGIN ICON */}
              <div className="relative cursor-pointer">
                {user ? (
                  <div className="flex items-center gap-3">
                    {user.isAdmin && (
                      <Link to="/admin" className="text-white text-sm px-3 py-1 rounded-md bg-black/20 hover:bg-black/30">Admin</Link>
                    )}
                    <Link to="/profile">
                      <UserCircleIcon className="w-7 h-7 text-white hover:text-black" />
                    </Link>
                  </div>
                ) : (
                  <Link to="/login">
                    <UserCircleIcon className="w-7 h-7 text-white hover:text-black" />
                  </Link>
                )}
              </div>

              {/* CART ICON */}
              <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                <ShoppingCartIcon className="w-7 h-7 text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* MOBILE MENU ICONS */}
        <div className="md:hidden flex items-center space-x-5">
            {/* NOTIFICATION ICON */}
          <div className="relative cursor-pointer ">
              <BellIcon className="w-6 h-6 text-white hover:text-red-600 transition" />
          </div>

            {/* CART ICON */}
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <ShoppingCartIcon className="w-7 h-6 text-white" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                {cartItemCount}
              </span>
            )}
          </div>

            {/* WISHLIST ICON */}
          <div onClick={() => navigate("/wishlist")} className="relative cursor-pointer">
            <HeartIcon className="w-7 h-6 text-white" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                {wishlistCount}
              </span>
            )}
          </div>
        </div>
      </div>
    
    </nav>
  );
};

export default Navbar;
