import React, { useEffect, useState } from "react";
import { Users, ShoppingCart, Package } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MiniBarChart = ({ series = [] }) => {
  const max = Math.max(...series.map((s) => s.value), 1);

  return (
    <div className="flex items-end gap-1 h-32 w-full">
      {series.map((s, idx) => (
        <div
          key={idx}
          title={`${s.date}: ${s.value}`}
          className="bg-indigo-500 hover:bg-indigo-600 transition-all rounded-sm"
          style={{
            width: `${100 / series.length}%`,
            height: `${(s.value / max) * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

const Analytics = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [range, setRange] = useState(30);
  const [salesSeries, setSalesSeries] = useState([]);
  const [usersSeries, setUsersSeries] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);

      try {
        const [uRes, oRes, pRes] = await Promise.all([
          fetch(`${BASE_URL}/users`, {
            headers: { Authorization: token ? `Bearer ${token}` : "" },
          }),
          fetch(`${BASE_URL}/orders`, {
            headers: { Authorization: token ? `Bearer ${token}` : "" },
          }),
          fetch(`${BASE_URL}/products`, {
            headers: { Authorization: token ? `Bearer ${token}` : "" },
          }),
        ]);

        const u = uRes.ok ? await uRes.json() : [];
        const o = oRes.ok ? await oRes.json() : [];
        const p = pRes.ok ? await pRes.json() : [];

        setUsersCount(Array.isArray(u) ? u.length : 0);
        setOrdersCount(Array.isArray(o) ? o.length : 0);
        setProductsCount(Array.isArray(p) ? p.length : 0);
      } catch (err) {
        console.error("Counts fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [token]);

  useEffect(() => {
    const headers = { Authorization: token ? `Bearer ${token}` : "" };

    const fetchSeries = async () => {
      try {
        const [salesRes, usersRes] = await Promise.all([
          fetch(`${BASE_URL}/super-admin/reports/sales?range=${range}`, {
            headers,
          }),
          fetch(`${BASE_URL}/super-admin/reports/users?range=${range}`, {
            headers,
          }),
        ]);

        if (salesRes.ok) {
          const data = await salesRes.json();
          setSalesSeries(data.series || []);
        }

        if (usersRes.ok) {
          const data = await usersRes.json();
          setUsersSeries(data.series || []);
        }
      } catch (err) {
        console.error("Series fetch failed", err);
      }
    };

    fetchSeries();
  }, [range, token]);

  const exportCountsCSV = () => {
    const rows = [
      ["Metric", "Value"],
      ["Total Users", usersCount],
      ["Total Orders", ordersCount],
      ["Total Products", productsCount],
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics.csv";
    a.click();
  };

  if (loading)
    return (
      <div className="bg-white rounded-xl p-6 shadow text-center">
        Loading analytics...
      </div>
    );

  return (
    <section className="space-y-6">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl font-bold">Super Admin Analytics</h2>

        <div className="flex gap-2">
          <select
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
            className="border rounded px-3 py-2"
          >
            <option value={7}>7 Days</option>
            <option value={30}>30 Days</option>
            <option value={90}>90 Days</option>
          </select>

          <button
            onClick={exportCountsCSV}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="bg-indigo-50 p-5 rounded-xl shadow hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-indigo-600">{usersCount}</p>
            </div>

            <Users className="text-indigo-500" size={32} />
          </div>
        </div>

        <div className="bg-green-50 p-5 rounded-xl shadow hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <p className="text-3xl font-bold text-green-600">
                {ordersCount}
              </p>
            </div>

            <ShoppingCart className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-yellow-50 p-5 rounded-xl shadow hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="text-3xl font-bold text-yellow-600">
                {productsCount}
              </p>
            </div>

            <Package className="text-yellow-500" size={32} />
          </div>
        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">Sales</h3>
            <span className="text-xs text-gray-400">
              Last {range} days
            </span>
          </div>

          {salesSeries.length === 0 ? (
            <div className="h-32 flex items-center justify-center text-gray-400">
              No sales data
            </div>
          ) : (
            <MiniBarChart series={salesSeries} />
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">New Users</h3>
            <span className="text-xs text-gray-400">
              Last {range} days
            </span>
          </div>

          {usersSeries.length === 0 ? (
            <div className="h-32 flex items-center justify-center text-gray-400">
              No user data
            </div>
          ) : (
            <MiniBarChart series={usersSeries} />
          )}
        </div>

      </div>

    </section>
  );
};

export default Analytics;