import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Tabs
import Dashboard from "./Merchant/Dashboard";
import MyProfile from "./Merchant/MyProfile";
import MyOrders from "./Merchant/MyOrders";
import MyWallet from "./Merchant/MyWallet";
import MyAddresses from "./Merchant/MyAddresses";
import Wishlist from "./Merchant/Wishlist";
import Support from "./Merchant/Support";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  /* ================= USER LOAD ================= */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /* ================= BACK TO STORE ================= */
  const handleBackToStore = () => {
    navigate("/"); // 🔁 change to "/merchant/home" if needed
  };

  if (!user) return null;

  const menuItems = [
    "Dashboard",
    "My Profile",
    "My Orders",
    "My Wallet",
    "My Addresses",
    "Wishlist",
    "Support",
  ];

  /* ================= TAB RENDER ================= */
  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard user={user} />;

      case "My Profile":
        return <MyProfile user={user} />;

      case "My Orders":
        return <MyOrders user={user} />;

      case "My Wallet":
        return <MyWallet user={user} />;

      case "My Addresses":
        return <MyAddresses user={user} />;

      case "Wishlist":
        return <Wishlist user={user} />;

      case "Support":
        return <Support user={user} />;

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 relative">

      {/* ================= OVERLAY (MOBILE) ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full w-64
        bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold flex flex-col
        mt-16 lg:mt-0
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-6 border-b border-orange-300 flex justify-between items-center">
          <h2 className="text-2xl font-extrabold text-black">My Account</h2>
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center
            bg-white text-orange-600 rounded-full shadow"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="py-4 space-y-1 flex-1">

          {menuItems.map((item) => (
            <div
              key={item}
              onClick={() => {
                setActiveTab(item);
                setSidebarOpen(false);
              }}
              className={`px-6 py-3 ml-3 rounded-l-full cursor-pointer transition
              ${
                activeTab === item
                  ? "bg-white text-orange-600 font-semibold"
                  : "hover:bg-yellow-500"
              }`}
            >
              {item}
            </div>
          ))}

          {/* BACK TO STORE */}
          <div
            onClick={handleBackToStore}
            className="px-6 py-3 ml-3 mt-4 rounded-l-full cursor-pointer
             hover:bg-yellow-500 transition"
          >
            ← Back to Store
          </div>

          {/* LOGOUT */}
          <div
            onClick={handleLogout}
            className="px-6 py-3 ml-3 mt-2 rounded-l-full cursor-pointer
             hover:bg-red-600 text-white"
          >
            Logout
          </div>
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl font-bold"
          >
            ☰
          </button>
          <h1 className="font-semibold">{activeTab}</h1>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default Profile;
