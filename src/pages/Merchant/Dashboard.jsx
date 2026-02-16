import React, { useEffect, useState } from "react";
import { FaClock, FaShoppingCart, FaDollarSign, FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, stats }) => {
  const [greeting, setGreeting] = useState("");
  const [now, setNow] = useState(new Date());
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = now.getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, [now]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setRecent(saved.slice(0, 3));
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-tr from-purple-200 via-pink-200 to-pink-100 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-purple-800">{greeting},</h2>
        <p className="text-purple-900 text-xl font-bold mt-1">{user?.name || "Merchant"}</p>
        <p className="text-gray-600 mt-2">{now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
        <div className="inline-flex items-center gap-2 mt-2 bg-white px-3 py-1 rounded-full shadow text-gray-700 text-sm font-medium">
          <FaClock />
          <span>{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>

        <div className="mt-4 flex gap-3">
          <button onClick={() => navigate("/merchant/orders")} className="px-3 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">View Orders</button>
        </div>
      </div>
  </div>
  );
};

export default Dashboard;
