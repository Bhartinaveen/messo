import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StatCard = ({ title, value, hint }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

const MiniBarChart = ({ series = [] }) => {
  const max = Math.max(...series.map(s => s.value), 1);
  return (
    <div className="flex items-end gap-1 h-20">
      {series.map((s, idx) => (
        <div key={idx} title={`${s.date}: ${s.value}`} className="bg-indigo-500 rounded-sm" style={{ width: `${100/series.length}%`, height: `${(s.value/max)*100}%` }} />
      ))}
    </div>
  );
};

const SuperDashboard = ({ onNavigate }) => {
  const { token } = useAuth();
  const [overview, setOverview] = useState(null);
  const [salesSeries, setSalesSeries] = useState([]);
  const [usersSeries, setUsersSeries] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: token ? `Bearer ${token}` : '' };

    const fetchOverview = async () => {
      try {
        const [ovRes, salesRes, usersRes, productsRes] = await Promise.all([
          fetch(`${BASE_URL}/super-admin/overview`, { headers }),
          fetch(`${BASE_URL}/super-admin/reports/sales?range=30`, { headers }),
          fetch(`${BASE_URL}/super-admin/reports/users?range=30`, { headers }),
          fetch(`${BASE_URL}/super-admin/reports/products`, { headers }),
        ]);

        if (!ovRes.ok) throw new Error('Overview fetch failed');
        const ov = await ovRes.json();
        setOverview(ov);

        if (salesRes.ok) {
          const s = await salesRes.json();
          setSalesSeries(s.series || []);
        }
        if (usersRes.ok) {
          const u = await usersRes.json();
          setUsersSeries(u.series || []);
        }
        if (productsRes.ok) {
          const p = await productsRes.json();
          setTopProducts(p.top || []);
        }
      } catch (e) {
        console.error('SuperDashboard fetch error', e);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [token]);

  if (loading) return <div className="bg-white rounded-xl p-6 shadow">Loading Super Dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Users" value={overview?.totalUsers ?? '—'} hint={overview?.blockedUsers ? `${overview.blockedUsers} blocked` : ''} />
        <StatCard title="Total Orders" value={overview?.totalOrders ?? '—'} hint="All orders" />
        <StatCard title="Total Revenue" value={`₹${(overview?.totalRevenue || 0).toFixed(2)}`} hint="Paid orders" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Sales (30 days)</h3>
            <div className="text-xs text-gray-500">Last 30 days</div>
          </div>
          <MiniBarChart series={salesSeries} />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">New Users (30 days)</h3>
            <div className="text-xs text-gray-500">Last 30 days</div>
          </div>
          <MiniBarChart series={usersSeries} />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Top Products</h3>
          <ul className="space-y-2 max-h-48 overflow-auto">
            {topProducts.length === 0 ? <li className="text-gray-500">No sales data</li> : topProducts.map(p => (
              <li key={p.id} className="flex items-center gap-3">
                <img src={p.image || '/image/logo.png'} alt={p.name} className="w-10 h-10 object-cover rounded" />
                <div>
                  <div className="font-medium text-sm">{p.name}</div>
                  <div className="text-xs text-gray-500">Sold: {p.qty}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => onNavigate('users')} className="px-3 py-2 rounded bg-indigo-600 text-white">Users Management</button>
          <button onClick={() => onNavigate('admin-management')} className="px-3 py-2 rounded bg-black text-white">Admin Management</button>
          <button onClick={() => onNavigate('settings')} className="px-3 py-2 rounded bg-yellow-500 text-white">Settings</button>
          <button onClick={() => onNavigate('security-logs')} className="px-3 py-2 rounded bg-red-500 text-white">Security Logs</button>
        </div>
      </div>
    </div>
  );
};

export default SuperDashboard;
