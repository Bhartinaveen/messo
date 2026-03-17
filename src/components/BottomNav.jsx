import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  Squares2X2Icon,
  UserIcon,
  ClipboardDocumentListIcon
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext"; 

export default function BottomNav() {
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const { user } = useAuth(); // Get user from AuthContext
  const isLoggedIn = !!user; // Determine login status reactively

  // ✅ Before Login
  const guestNavItems = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/explore", label: "Explore", icon:   GlobeAltIcon },
    { to: "/about", label: "About", icon: InformationCircleIcon },
  ];

  // ✅ After Login
  const userNavItems = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/explore", label: "Categories", icon: Squares2X2Icon }, // Changed from /categories to /explore
    { to: "/my-orders", label: "Orders", icon: ClipboardDocumentListIcon },
    // MODIFIED: Conditional path for Profile button
    { 
      to: user && (user.role === 'admin' || user.role === 'superadmin') ? "/admin" : "/profile", 
      label: "Profile", 
      icon: UserIcon 
    },
  ];

  // The actual items to render based on login status
  const navItemsToRender = isLoggedIn ? userNavItems : guestNavItems;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 md:hidden">
        <div className="flex justify-around items-center h-16 text-xs font-medium">

          {navItemsToRender.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex flex-col items-center justify-center relative transition-all duration-200 ${
                  isActive
                    ? "text-orange-600 scale-105"
                    : "text-gray-500 hover:text-yellow-500"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute -top-2 w-8 h-1 bg-yellow-300 rounded-full"></span>
                  )}
                  <Icon className="w-6 h-6 mb-1" />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}

          {/* Show Account Modal only if NOT logged in */}
          {!isLoggedIn && (
            <button
              onClick={() => setShowAccountMenu(true)}
              className="flex flex-col items-center justify-center text-gray-500 hover:text-yellow-500 transition-all duration-200"
            >
              <UserIcon className="w-6 h-6 mb-1" />
              <span>Account</span>
            </button>
          )}

        </div>
      </nav>

      {/* Slide Up Modal (Only for Guest) */}
      {!isLoggedIn && showAccountMenu && (
        
          <div className="fixed inset-0 bg-black/40 flex items-end z-50 md:hidden">
            
            <div className="bg-white w-full rounded-t-3xl p-6">

              {/* small top bar */}
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5"></div>

              <h2 className="text-center text-lg font-semibold mb-1">
                Welcome
              </h2>

              <p className="text-center text-gray-500 text-sm mb-6">
                Login or start selling on FirstUShop
              </p>

              <div className="space-y-3">

                <button
                  onClick={() => {
                    setShowAccountMenu(false);
                    navigate("/login");
                  }}
                  className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
                >
                  Login to your account
                </button>

                <button
                  onClick={() => {
                    setShowAccountMenu(false);
                    navigate("/partner-auth");
                  }}
                  className="w-full py-3 border rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Become a Seller
                </button>

                <button
                  onClick={() => setShowAccountMenu(false)}
                  className="w-full py-3 text-red-500 font-medium hover:bg-red-50 rounded-xl"
                >
                  Cancel
                </button>

              </div>

            </div>
          </div>
        )}
    </>
  );
}