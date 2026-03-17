import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaKey, FaBars, FaTimes, FaSignOutAlt, FaStore,  FaTachometerAlt,
  FaUser,
  FaUsers,
  FaChartBar,
  FaCog,
  FaShieldAlt,
  FaUserShield,
  FaTruck,
  FaWallet,         
  FaMoneyBillWave,   
  FaImages,
  FaExchangeAlt, 
  FaBox,    
  FaHeadset } from "react-icons/fa";

const AdminSidebar = ({ selectedView = "dashboard", onSelect }) => {
  const navigate = useNavigate();
  const [openMobile, setOpenMobile] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
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
    `flex items-center gap-3 px-6 py-3 w-full cursor-pointer font-bold transition rounded-l-full whitespace-nowrap ${
      selectedView === name
        ? "bg-white text-orange-600 font-semibold"
        : "text-gray-300 hover:bg-yellow-500 hover:text-black " // Match customer sidebar hover
    }`;

  const isSuperAdmin = user?.role === "superadmin";
  const isAdmin = user?.role === "admin";

 const Menu = () => (
  <>
    <button onClick={() => handleClick("dashboard")} className={linkClass("dashboard")}>
      <FaTachometerAlt />
      {isSuperAdmin ? "Super Dashboard" : "Dashboard"}
    </button>

    {isSuperAdmin && (
      <>
        <button onClick={() => handleClick("partner-approvals")} className={linkClass("partner-approvals")}>
          <FaUserShield />
          Partner Approvals
        </button>

        <button onClick={() => handleClick("analytics")} className={linkClass("analytics")}>
          <FaChartBar />
          Analytics
        </button>

        <button onClick={() => handleClick("security-logs")} className={linkClass("security-logs")}>
          <FaShieldAlt />
          Security Logs
        </button>

        <div>
        <button onClick={() => setSettingsOpen(!settingsOpen)} className={linkClass("settings")}>
          <FaCog />
          Settings

          <span className="ml-auto">
            {settingsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </button>
        {settingsOpen && (
          <div className="ml-10 mt-1 flex flex-col space-y-1">

            <button
              onClick={() => handleClick("profile")}
              className={linkClass("profile")}
            >
              <FaUser />
              Profile
            </button>

              <button
                onClick={() => handleClick("forgot-password")}
                className={linkClass("forgot-password")}
              >
                <FaKey />
                Forgot Password
              </button>

            </div>
          )}
        </div>

        <button onClick={() => handleClick("admin-management")} className={linkClass("admin-management")}>
          <FaUsers />
          Admin Management
        </button>
      </>
    )}

    {(isAdmin || isSuperAdmin) && (
      <>
        <button onClick={() => handleClick("orders")} className={linkClass("orders")}>
          <FaBox />
          Orders
        </button>

        <button onClick={() => handleClick("products")} className={linkClass("products")}>
          <FaStore />
          Products
        </button>

        <button
          onClick={() => handleClick("transactions")}
          className={linkClass("transactions")}
        >
          <FaExchangeAlt />
          Transactions
        </button>

        <button onClick={() => handleClick("order-history")} className={linkClass("order-history")}>
          <FaBox />
          Order History
        </button>
      </>
    )}

    {isSuperAdmin && (
      <>
        <button onClick={() => handleClick("wallet")} className={linkClass("wallet")}>
          <FaWallet />
          Wallet
        </button>

        <button onClick={() => handleClick("cod-remittance")} className={linkClass("codremittance")}>
          <FaMoneyBillWave />
          COD Remittance
        </button>

        <button
         onClick={() => handleClick("users")} className={linkClass("users")}>
          <FaUsers />
          Users
        </button>

        <button onClick={() => handleClick("hero")} className={linkClass("hero")}>
          <FaImages />
          Hero Manager
        </button>
      </>
    )}

    {isAdmin && !isSuperAdmin && (
      <button onClick={() => handleClick("partners")} className={linkClass("partners")}>
        <FaTruck />
        Delivery Partners
      </button>
    )}

    

    

    <button onClick={() => handleClick("support")} className={linkClass("support")}>
      <FaHeadset />
      Support
    </button>
  </>
);

  return (
    <>
  
      <style>
      {`
      .sidebar-scroll::-webkit-scrollbar {
        width: 6px;
      }

      .sidebar-scroll::-webkit-scrollbar-thumb {
        background: #666;
        border-radius: 10px;
      }

      .sidebar-scroll::-webkit-scrollbar-track {
        background: transparent;
      }
      `}
      </style>


      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 h-screen bg-black text-white relative z-40"> {/* Changed padding for header */}
        
        {/* Header section - visually similar to customer profile sidebar's header */}
        <div className="p-6 border-b border-orange-300"> {/* MODIFIED: Added p-6 and border-orange-300 */}
          <h2 className="text-2xl font-bold text-white">
            {isSuperAdmin ? "Super Admin Panel" : isAdmin ? "Admin Panel" : "Admin Panel"}
          </h2>
        </div>

        <nav className="py-4 space-y-2 flex-1 overflow-y-auto sidebar-scroll">
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
      <div className="md:hidden">

        {/* Top Bar */}
        <div className="md:hidden flex items-center justify-between p-4 text-black">
          <button
            onClick={() => setOpenMobile(true)}
            className="text-2xl font-bold"
          >
            <FaBars />
          </button>

          <h1 className="font-semibold">
            {isSuperAdmin ? "Super Admin Panel" : "Admin Panel"}
          </h1>
        </div>

        {/* Overlay */}
        {openMobile && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpenMobile(false)}
          />
        )}

        {/* Sliding Sidebar */}
        <aside
            className={`fixed md:static top-0 left-0 h-full w-64 bg-black text-white
            transform transition-transform duration-300 z-50
            ${openMobile ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0`}
          >

          {/* Header */}
          <div className="p-6 border-b border-orange-300 flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {isSuperAdmin ? "Super Admin Panel" : "Admin Panel"}
            </h2>

            <button
              onClick={() => setOpenMobile(false)}
              className="bg-white text-orange-600 w-8 h-8 rounded-full flex items-center justify-center"
            >
              <FaTimes />
            </button>
          </div>

          {/* Menu */}
          <nav className="py-4 space-y-2 h-[calc(100vh-80px)] overflow-y-auto sidebar-scroll pb-24">
            <Menu />

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 px-6 py-3 w-full font-bold
              text-gray-300 hover:bg-blue-500 hover:text-white transition"
            >
              <FaStore />
              Back to Store
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-6 py-3 w-full font-bold
              text-gray-300 hover:bg-red-600 hover:text-white transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </nav>

        </aside>

      </div>
    </>
  );
};



export default AdminSidebar;
