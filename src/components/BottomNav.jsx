import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BookOpenIcon,
  InformationCircleIcon,
  Squares2X2Icon,
  UserIcon,
  ClipboardDocumentListIcon
} from "@heroicons/react/24/outline";

export default function BottomNav() {
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check login
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  // ✅ Before Login
  const guestNavItems = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/blog", label: "Blog", icon: BookOpenIcon },
    { to: "/about", label: "About", icon: InformationCircleIcon },
  
  ];

  // ✅ After Login
  const userNavItems = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/categories", label: "Categories", icon: Squares2X2Icon },
   
    { to: "/my-orders", label: "Orders", icon: ClipboardDocumentListIcon },
    { to: "/profile", label: "Profile", icon: UserIcon },
  ];

  const navItems = isLoggedIn ? userNavItems : guestNavItems;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 md:hidden">
        <div className="flex justify-around items-center h-16 text-xs font-medium">

          {navItems.map(({ to, label, icon: Icon }) => (
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
          <div className="bg-white w-full rounded-t-3xl p-6 space-y-4 animate-slideUp">

            <button
              onClick={() => {
                setShowAccountMenu(false);
                navigate("/login");
              }}
              className="w-full py-3 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Login
            </button>

            <button
              onClick={() => {
                setShowAccountMenu(false);
                navigate("/partner-auth");
              }}
              className="w-full py-3 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Become a Seller
            </button>

            <button
              onClick={() => setShowAccountMenu(false)}
              className="w-full py-3 text-red-500 font-medium"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </>
  );
}