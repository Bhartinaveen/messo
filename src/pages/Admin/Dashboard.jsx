import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = ({ user }) => {
  const [now, setNow] = useState(new Date());
  const [greeting, setGreeting] = useState("Hello");
  const [reports, setReports] = useState(null);
  const token = localStorage.getItem('token');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Update greeting based on hour
  useEffect(() => {
    const hour = now.getHours();
    if (hour < 12) setGreeting("Good Morning 🌅");
    else if (hour < 17) setGreeting("Good Afternoon ☀️");
    else if (hour < 22) setGreeting("Good Evening 🌆");
    else setGreeting("Good Night 🌙");
  }, [now]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${BASE_URL}/admin/reports`, { headers: { Authorization: token ? `Bearer ${token}` : '' } });
        const data = await res.json();
        setReports(data);
      } catch (e) { setReports(null); }
    };
    fetchReports();
  }, []);

  return (
    <div className="space-y-6">
      {/* Greeting Card */}
      <div className="bg-gradient-to-tr from-purple-100 to-pink-100 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold">{greeting},</h2>
        <p className="text-purple-700 text-xl font-bold mt-1">{user.name}</p>
        <p className="text-gray-600 mt-3">
          {now.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
        <span className="inline-block mt-2 px-4 py-1 bg-white rounded-full shadow text-sm">
          {now.toLocaleTimeString()}
        </span>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Sales (₹)</p>
          <p className="text-2xl font-bold">{reports ? reports.totalSales.toFixed(2) : '—'}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold">{reports ? reports.ordersCount : '—'}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-sm text-gray-500">Top Products</p>
          <div className="mt-2 space-y-2">
            {reports && reports.topProducts.length === 0 ? <div className="text-gray-500">—</div> : (
              reports?.topProducts?.map(tp => (
                <div key={tp.id} className="flex items-center gap-3">
                  <img src={tp.image || '/image/logo.png'} alt={tp.name} className="w-8 h-8 object-cover rounded" />
                  <div className="text-sm">{tp.name} <span className="text-xs text-gray-500">x{tp.qty}</span></div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
