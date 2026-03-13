import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Users,
  Store,
  ShoppingCart,
  IndianRupee,
  Package,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ------------------ STAT CARD ------------------ */

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div
    className={`rounded-xl p-5 text-white shadow-md ${color}
    hover:shadow-xl transition`}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <Icon size={28} />
    </div>
  </div>
);

/* ------------------ MINI BAR CHART ------------------ */

const MiniBarChart = ({ series = [] }) => {
  const max = Math.max(...series.map((s) => s.value), 1);

  return (
    <div className="flex items-end gap-1 h-24">
      {series.map((s, i) => (
        <div
          key={i}
          className="bg-indigo-500 rounded"
          style={{
            width: `${100 / series.length}%`,
            height: `${(s.value / max) * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

const SuperDashboard = () => {
  const { token, user } = useAuth();

  const [overview, setOverview] = useState(null);
  const [salesSeries, setSalesSeries] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

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
        const [ov, sales, products, orders] = await Promise.all([
          fetch(`${BASE_URL}/super-admin/overview`, { headers }),
          fetch(`${BASE_URL}/super-admin/reports/sales?range=30`, { headers }),
          fetch(`${BASE_URL}/super-admin/reports/products`, { headers }),
          fetch(`${BASE_URL}/super-admin/orders?limit=5`, { headers }),
        ]);

        setOverview(await ov.json());

        if (sales.ok) {
          const s = await sales.json();
          setSalesSeries(s.series || []);
        }

        if (products.ok) {
          const p = await products.json();
          setTopProducts(p.top || []);
        }

        if (orders.ok) {
          const o = await orders.json();
          setRecentOrders(o.orders || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [token]);

  return (
    <div className="space-y-6">

      {/* ---------- GREETING ---------- */}

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold">
          Welcome back, {user?.name || "Admin"} 👋
        </h2>

        <p className="text-sm opacity-90">
          {now.toLocaleDateString("en-IN", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* ---------- STATS ---------- */}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

        <StatCard
          title="Customers"
          value={overview?.totalUsers ?? "--"}
          icon={Users}
          color="bg-blue-500"
        />

        <StatCard
          title="Vendors"
          value={overview?.totalVendors ?? "--"}
          icon={Store}
          color="bg-purple-500"
        />

        <StatCard
          title="Orders"
          value={overview?.totalOrders ?? "--"}
          icon={ShoppingCart}
          color="bg-green-500"
        />

        <StatCard
          title="Products"
          value={overview?.totalProducts ?? "--"}
          icon={Package}
          color="bg-orange-500"
        />

        <StatCard
          title="Revenue"
          value={`₹${overview?.totalRevenue ?? 0}`}
          icon={IndianRupee}
          color="bg-pink-500"
        />

      </div>

      {/* ---------- SALES GRAPH ---------- */}

      <div className="bg-white rounded-xl shadow p-5">

        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={18} />
          Sales (Last 30 Days)
        </h3>

        <MiniBarChart series={salesSeries} />

      </div>

      {/* ---------- TOP PRODUCTS ---------- */}

      <div className="bg-white rounded-xl shadow p-5">

        <h3 className="font-semibold mb-4">
          Top Selling Products
        </h3>

        <div className="space-y-3">

          {topProducts.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 border-b pb-2"
            >
              <img
                src={p.image || "/image/logo.png"}
                className="w-12 h-12 rounded object-cover"
              />

              <div className="flex-1">
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-gray-500">
                  Sold {p.qty} items
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>

      {/* ---------- RECENT ORDERS ---------- */}

      <div className="bg-white rounded-xl shadow p-5">

        <h3 className="font-semibold mb-4">
          Recent Orders
        </h3>

        <table className="w-full text-sm">

          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-2">Order ID</th>
              <th className="text-left">Customer</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>

            {recentOrders.map((o) => (
              <tr key={o.id} className="border-t">

                <td className="py-2">{o.id}</td>

                <td>{o.customerName}</td>

                <td>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded">
                    {o.status}
                  </span>
                </td>

                <td>₹{o.total}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default SuperDashboard;