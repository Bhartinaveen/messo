import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [now, setNow] = useState(new Date());
  const [greeting, setGreeting] = useState("Hello");
  const [reports, setReports] = useState(null);
  const token = localStorage.getItem("token");

  // Live Time
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Greeting Logic
  useEffect(() => {
    const hour = now.getHours();
    if (hour < 12) setGreeting("Good Morning 🌅");
    else if (hour < 17) setGreeting("Good Afternoon ☀️");
    else if (hour < 22) setGreeting("Good Evening 🌆");
    else setGreeting("Good Night 🌙");
  }, [now]);

  // Fetch Reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${BASE_URL}/admin/reports`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        const data = await res.json();
        setReports(data);
      } catch (e) {
        setReports(null);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="space-y-6">

      {/* Greeting Banner */}
      <div className="bg-gradient-to-r from-yellow-100 via-orange-100 to-orange-200 text-black p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-semibold">
          {greeting}, {user?.name || "Admin"} 👋
        </h2>

        <p className="mt-3 opacity-90">
          {now.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>

        <span className="inline-block mt-2 px-4 py-1 bg-white text-purple-600 rounded-full shadow text-sm">
          {now.toLocaleTimeString()}
        </span>

      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* <div className="bg-white shadow rounded-xl p-5">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-indigo-600">
            {reports ? reports.usersCount : "—"}
          </p>
        </div> */}

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-green-600">
            {reports ? reports.ordersCount : "—"}
          </p>
        </div>

        {/* <div className="bg-white shadow rounded-xl p-5">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold text-blue-600">
            {reports ? reports.productsCount : "—"}
          </p>
        </div> */}

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-bold text-pink-600">
            ₹{reports ? reports.totalSales?.toFixed(2) : "—"}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;