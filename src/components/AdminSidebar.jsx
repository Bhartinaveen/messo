// FirstUShop/src/components/AdminSidebar.jsx (MODIFIED)
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt, FaStore } from "react-icons/fa";

const AdminSidebar = ({ selectedView = "dashboard", onSelect }) => {
  const navigate = useNavigate();
  const [openMobile, setOpenMobile] = useState(false);
  const { logout, user } = useAuth(); // Use user from AuthContext

  const handleLogout = () => {
    logout();
    setOpenMobile(false);
    navigate("/");
  };

  const handleClick = (view) => {
    onSelect(view);
    setOpenMobile(false);
  };

  // Modified linkClass to match customer profile sidebar visually
  const linkClass = (name) =>
    `flex items-center gap-3 px-6 py-3 w-full cursor-pointer font-bold transition whitespace-nowrap ${
      selectedView === name
        ? "bg-white text-orange-600 font-semibold"
        : "text-gray-300 hover:bg-yellow-500 hover:text-black" // Match customer sidebar hover
    }`;

  const isSuperAdmin = user?.role === "superadmin";
  const isAdmin = user?.role === "admin";

  const Menu = () => (
    <>
      {/* Dashboard */}
      <button onClick={() => handleClick("dashboard")} className={linkClass("dashboard")}>
        {isSuperAdmin ? "Super Dashboard" : "Dashboard"}
      </button>

      {/* Superadmin Only */}
      {isSuperAdmin && (
        <>
          {/* NEW: Partner Approvals */}
          <button onClick={() => handleClick("partner-approvals")} className={linkClass("partner-approvals")}>
            Partner Approvals
          </button>

          <button onClick={() => handleClick("analytics")} className={linkClass("analytics")}>
            Analytics
          </button>

          <button onClick={() => handleClick("security-logs")} className={linkClass("security-logs")}>
            Security Logs
          </button>

          <button onClick={() => handleClick("settings")} className={linkClass("settings")}>
            Settings
          </button>

          <button onClick={() => handleClick("admin-management")} className={linkClass("admin-management")}>
              Admin Management
            </button>
        </>
      )}

      {/* Admin (Partner) + SuperAdmin Common */}
      {(isAdmin || isSuperAdmin) && (
        <>
          <button onClick={() => handleClick("orders")} className={linkClass("orders")}>
            Orders
          </button>

          <button onClick={() => handleClick("products")} className={linkClass("products")}>
            Products
          </button>
        </>
      )}
      
      {/* Superadmin Only - Continued */}
      {isSuperAdmin && (
        <>
          <button onClick={() => handleClick("users")} className={linkClass("users")}>
            Users
          </button>
          <button onClick={() => handleClick("hero")} className={linkClass("hero")}>
            Hero Manager
          </button>
        </>
      )}

      {/* Admin (Partner) Only */}
      {isAdmin && !isSuperAdmin && (
        <>
          <button onClick={() => handleClick("partners")} className={linkClass("partners")}>
            Delivery Partners (Local)
          </button>
        </>
      )}

      <button onClick={() => handleClick("profile")} className={linkClass("profile")}>
        Profile
      </button>

      <button onClick={() => handleClick("support")} className={linkClass("support")}>
        Support
      </button>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 min-h-screen bg-black text-white relative z-40"> {/* Changed padding for header */}
        
        {/* Header section - visually similar to customer profile sidebar's header */}
        <div className="p-6 border-b border-orange-300"> {/* MODIFIED: Added p-6 and border-orange-300 */}
          <h2 className="text-2xl font-bold text-white">
            {isSuperAdmin ? "Super Admin Panel" : isAdmin ? "Admin Panel" : "Admin Panel"}
          </h2>
        </div>

        <nav className="py-4 space-y-2 flex-1">
          <Menu />

          {/* Back to Store link, matching style of other menu items */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-6 py-3 w-full font-bold
            text-gray-300 hover:bg-blue-500 hover:text-white transition" // MODIFIED: Hover color for distinction
          >
            <FaStore />
            Back to Store
          </button>

          {/* Logout button, matching style of other menu items */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 w-full font-bold
            text-gray-300 hover:bg-red-600 hover:text-white transition" // MODIFIED: Hover color for distinction
          >
            <FaSignOutAlt />
            Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden relative bg-black text-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg"> {/* MODIFIED: Slightly adjusted text size for mobile header */}
            {isSuperAdmin ? "Super Admin" : isAdmin ? "Partner Admin" : "Admin Panel"}
          </h2>

          <button onClick={() => setOpenMobile(!openMobile)}>
            {openMobile ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {openMobile && (
          <div className="absolute left-0 top-full w-full bg-black p-4 space-y-2 shadow-lg z-50">
            <nav className="space-y-2">
              <Menu />

              <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg font-medium text-white hover:bg-white/20 transition mt-2"
              >
                <FaStore />
                Back to Store
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg font-medium text-white hover:bg-white/20 transition mt-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminSidebar;