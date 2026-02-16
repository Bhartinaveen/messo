import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

    localStorage.removeItem("user");
    localStorage.removeItem("token"); // if you store token
    navigate("/login");
  };

  if (!user) return null;

return (
  <div className="min-h-screen bg-gray-100 py-6 px-3 sm:px-6">
    <div className="max-w-6xl mx-auto">

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-6">
        <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-center gap-6">
          
          {/* Avatar */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg">
            {(user.name || user.username || "A")[0].toUpperCase()}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-semibold">
              {user.name || user.fullName || user.username}
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              {user.email}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {user.role === "superadmin"
                ? "Super Administrator"
                : "Administrator"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate("/admin")}
              className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Back
            </button>

            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-6">
          Account Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium text-base mt-1">
              {user.name || user.fullName || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-base mt-1">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Mobile</p>
            <p className="font-medium text-base mt-1">
              {user.phone || user.mobile || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="font-medium text-base mt-1">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
            Manage Users
          </button>

          <button className="py-3 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition">
            View Orders
          </button>

          <button className="py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
            Site Settings
          </button>
        </div>
      </div>

    </div>
  </div>
 );
}

export default AdminProfile;

