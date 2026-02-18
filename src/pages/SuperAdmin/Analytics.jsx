import React, { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MiniBarChart = ({ series = [] }) => {
  const max = Math.max(...series.map(s => s.value), 1);
  return (
    <div className="flex items-end gap-1 h-28">
      {series.map((s, idx) => (
        <div key={idx} title={`${s.label || s.date}: ${s.value}`} className="bg-indigo-500 rounded-sm" style={{ width: `${100/series.length}%`, height: `${(s.value/max)*100}%` }} />
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
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const [uRes, oRes, pRes] = await Promise.all([
          fetch(`${BASE_URL}/users`, { headers: { Authorization: token ? `Bearer ${token}` : '' } }),
          fetch(`${BASE_URL}/orders`, { headers: { Authorization: token ? `Bearer ${token}` : '' } }),
          fetch(`${BASE_URL}/products`, { headers: { Authorization: token ? `Bearer ${token}` : '' } }),
        ]);

        const u = uRes.ok ? await uRes.json() : [];
        const o = oRes.ok ? await oRes.json() : [];
        const p = pRes.ok ? await pRes.json() : [];

        setUsersCount(Array.isArray(u) ? u.length : 0);
        setOrdersCount(Array.isArray(o) ? o.length : 0);
        setProductsCount(Array.isArray(p) ? p.length : 0);
      } catch (err) {
        console.error('Analytics fetchCounts failed', err);
        setUsersCount(0);
        setOrdersCount(0);
        setProductsCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [token]);

  useEffect(() => {
    const headers = { Authorization: token ? `Bearer ${token}` : '' };
    const fetchSeries = async () => {
      try {
        const [salesRes, usersRes] = await Promise.all([
          fetch(`${BASE_URL}/super-admin/reports/sales?range=${range}`, { headers }),
          fetch(`${BASE_URL}/super-admin/reports/users?range=${range}`, { headers }),
        ]);

        if (salesRes.ok) {
          const data = await salesRes.json();
          setSalesSeries((data.series || []).map(s => ({ date: s.date, value: s.value })));
        } else setSalesSeries([]);

        if (usersRes.ok) {
          const data = await usersRes.json();
          setUsersSeries((data.series || []).map(s => ({ date: s.date, value: s.value })));
        } else setUsersSeries([]);
      } catch (err) {
        console.error('Analytics fetchSeries failed', err);
        setSalesSeries([]);
        setUsersSeries([]);
      }
    };

    fetchSeries();
  }, [token, range]);

  const exportCountsCSV = () => {
    const rows = [
      ['metric', 'value'],
      ['total_users', usersCount],
      ['total_orders', ordersCount],
      ['total_products', productsCount],
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `superadmin_counts_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="bg-white rounded-xl p-6 shadow">Loading analytics...</div>;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Super Admin Analytics</h2>
        <div className="flex items-center gap-3">
          <select value={range} onChange={(e) => setRange(Number(e.target.value))} className="px-3 py-2 border rounded">
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>

          <button onClick={exportCountsCSV} className="px-3 py-2 rounded bg-indigo-600 text-white">Export Counts</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-indigo-50">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-indigo-600">{usersCount}</p>
        </div>

        <div className="p-4 rounded-lg bg-green-50">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-green-600">{ordersCount}</p>
        </div>

        <div className="p-4 rounded-lg bg-yellow-50">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold text-yellow-600">{productsCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Sales ({range} days)</h3>
            <div className="text-xs text-gray-500">Last {range} days</div>
          </div>

          {salesSeries.length === 0 ? <div className="h-28 flex items-center justify-center text-gray-400">No sales data</div> : <MiniBarChart series={salesSeries} />}
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">New Users ({range} days)</h3>
            <div className="text-xs text-gray-500">Last {range} days</div>
          </div>

          {usersSeries.length === 0 ? <div className="h-28 flex items-center justify-center text-gray-400">No user data</div> : <MiniBarChart series={usersSeries} />}
        </div>
      </div>

    </section>
  );
};

export default Analytics;
