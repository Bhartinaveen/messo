import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Users,
  Store,
  ShoppingCart,
  DollarSign,
  Package,
  Truck,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ---------------- STAT CARD ---------------- */

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div
    className={`group bg-white border rounded-xl p-5 text-white shadow hover:shadow-xl transition flex items-center justify-between ${color}`}
  >
    <div>
      <p className="text-lg opacity-80 text-black">{title}</p>
      <p className="text-2xl font-bold mt-1 text-black">{value}</p>
    </div>

    <div className="text-gray-700 group-hover:text-indigo-600 transition">
      <Icon size={30} />
    </div>
  </div>
);

/* ---------------- MINI CHART ---------------- */

const MiniBarChart = ({ series = [] }) => {
  const max = Math.max(...series.map((s) => s.value), 1);

  return (
    <div className="flex items-end gap-2 h-32">
      {series.map((s, i) => (
        <div
          key={i}
          className="bg-indigo-500 rounded-md w-full"
          style={{ height: `${(s.value / max) * 100}%` }}
        />
      ))}
    </div>
  );
};

const SuperDashboard = () => {
  const { token, user } = useAuth();

  const [overview, setOverview] = useState(null);
  const [salesSeries, setSalesSeries] = useState([]);
  const [now, setNow] = useState(new Date());

  /* ---------- LIVE TIME ---------- */

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* ---------- FETCH DATA ---------- */

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    const load = async () => {
      try {
        const [ov, sales] = await Promise.all([
          fetch(`${BASE_URL}/super-admin/overview`, { headers }),
          fetch(`${BASE_URL}/super-admin/reports/sales?range=30`, { headers }),
        ]);

        if (ov.ok) setOverview(await ov.json());

        if (sales.ok) {
          const s = await sales.json();
          setSalesSeries(s.series || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [token]);

  return (
    <div className="space-y-6">

      {/* -------- GREETING -------- */}

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold">
          Welcome back, {user?.name || "Admin"} 👋
        </h2>

        <p className="text-sm opacity-90 mt-1">
          {now.toLocaleDateString("en-IN", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* -------- STATS GRID -------- */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <StatCard
          title="Total Customers"
          value={overview?.totalUsers ?? "--"}
          icon={Users}
        />

        <StatCard
          title="Vendors"
          value={overview?.totalVendors ?? "--"}
          icon={Store}
        />

        <StatCard
          title="Orders"
          value={overview?.totalOrders ?? "--"}
          icon={ShoppingCart}
        />

        <StatCard
          title="Delivered"
          value={overview?.deliveredOrders ?? "--"}
          icon={Package}
        />

        <StatCard
          title="Pending Pickups"
          value={overview?.pendingPickups ?? "--"}
          icon={AlertTriangle}
        />

        <StatCard
          title="Out For Delivery"
          value={overview?.outForDelivery ?? "--"}
          icon={Truck}
        />

        <StatCard
          title="Total RTO"
          value={overview?.totalRTO ?? "--"}
          icon={AlertTriangle}
        />

        <StatCard
          title="Revenue"
          value={`₹${overview?.totalRevenue ?? 0}`}
          icon={DollarSign}
        />

      </div>

      {/* -------- SALES CHART -------- */}

      <div className="bg-white rounded-xl shadow p-6">

        <h3 className="font-semibold mb-5 flex items-center gap-2">
          <TrendingUp size={18} />
          Sales (Last 30 Days)
        </h3>

        <MiniBarChart series={salesSeries} />

      </div>

    </div>
  );
};

export default SuperDashboard;