import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  LogOut,
  ArrowLeft,
  Users,
  ShoppingCart,
 
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);

        if (!u.isAdmin && u.role !== "admin" && u.role !== "superadmin") {
          navigate("/login");
          return;
        }

        setUser(u);
      } else {
        navigate("/login");
      }
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

      logout();
      navigate("/login");
    };


  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* PROFILE HEADER */}
        <div className="bg-gradient-to-r from-yellow-200 to-orange-400 text-white rounded-2xl shadow-lg p-6 sm:p-8">

          <div className="flex flex-col md:flex-row md:items-center gap-6">

            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white text-indigo-600 flex items-center justify-center text-4xl font-bold shadow-lg">
              {(user.name || user.username || "A")[0].toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                {user.name || user.fullName || user.username}
              </h1>

              <p className="opacity-90 mt-1">
                {user.email}
              </p>

              <div className="flex items-center gap-2 mt-2 text-sm opacity-90">
                <Shield size={16} />
                {user.role === "superadmin"
                  ? "Super Administrator"
                  : "Administrator"}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">

              <button
                onClick={() => navigate("/admin")}
                className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
              >
                <LogOut size={16} />
                Logout
              </button>

            </div>

          </div>
        </div>

        {/* ADMIN STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

          {user.totalUsers && (
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition flex items-center gap-4">
              <Users className="text-indigo-600" size={28} />
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-lg font-semibold">{user.totalUsers}</p>
              </div>
            </div>
          )}

          {user.totalOrders && (
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition flex items-center gap-4">
              <ShoppingCart className="text-green-600" size={28} />
              <div>
                <p className="text-sm text-gray-500">Orders</p>
                <p className="text-lg font-semibold">{user.totalOrders}</p>
              </div>
            </div>
          )}

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition flex items-center gap-4">
            <Shield className="text-purple-600" size={28} />
            <div>
              <p className="text-sm text-gray-500">Admin Role</p>
              <p className="text-lg font-semibold">
                {user.role === "superadmin" ? "Super Admin" : "Admin"}
              </p>
            </div>
          </div>

        </div>

        {/* ACCOUNT INFO */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">

          <h2 className="text-xl font-semibold mb-6">
            Account Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <InfoItem
              icon={<User size={18} />}
              label="Full Name"
              value={user.name || user.fullName || "-"}
            />

            <InfoItem
              icon={<Mail size={18} />}
              label="Email"
              value={user.email}
            />

            <InfoItem
              icon={<Phone size={18} />}
              label="Mobile"
              value={user.phone || user.mobile || "Not provided"}
            />

            <InfoItem
              icon={<Calendar size={18} />}
              label="Member Since"
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"
              }
            />

          </div>
        </div>

        {/* QUICK ACTIONS */}
        {/* <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">

          <h2 className="text-xl font-semibold mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <button
              onClick={() => navigate("/admin/users")}
              className="flex items-center justify-center gap-2 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <Users size={18} />
              Manage Users
            </button>

            <button
              onClick={() => navigate("/admin/orders")}
              className="flex items-center justify-center gap-2 py-3 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
            >
              <ShoppingCart size={18} />
              View Orders
            </button>

            <button
              onClick={() => navigate("/admin/settings")}
              className="flex items-center justify-center gap-2 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              <Settings size={18} />
              Site Settings
            </button>

          </div>

        </div> */}

      </div>
    </div>
  );
};

/* Reusable Info Item */

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
    <div className="text-indigo-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default AdminProfile;