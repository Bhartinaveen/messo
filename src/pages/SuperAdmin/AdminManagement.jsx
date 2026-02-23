import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminManagement = () => {
  const { token } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/super-admin/admins`, { headers: { Authorization: token ? `Bearer ${token}` : '' } });
      const data = await res.json();
      setAdmins(data || []);
    } catch (e) {
      setAdmins([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchAdmins(); }, []);

  const removeAdmin = async (id) => {
    if (!confirm('Delete this admin?')) return;
    try {
      const res = await fetch(`${BASE_URL}/super-admin/admins/${id}`, { method: 'DELETE', headers: { Authorization: token ? `Bearer ${token}` : '' } });
      if (!res.ok) throw new Error('Action failed');
      fetchAdmins();
    } catch (err) { alert(err.message || 'Action failed'); }
  };

  const createAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/super-admin/admins`, { method: 'POST', headers: { Authorization: token ? `Bearer ${token}` : '', 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error('Create failed');
      setForm({ name: '', email: '', password: '' });
      fetchAdmins();
    } catch (err) { alert(err.message || 'Create failed'); }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Admin Management</h2>
      <form onSubmit={createAdmin} className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        <input value={form.name} onChange={(e) => setForm(s => ({ ...s, name: e.target.value }))} placeholder="Name" className="px-3 py-2 border rounded" />
        <input value={form.email} onChange={(e) => setForm(s => ({ ...s, email: e.target.value }))} placeholder="Email" className="px-3 py-2 border rounded" />
        <input value={form.password} onChange={(e) => setForm(s => ({ ...s, password: e.target.value }))} placeholder="Password" className="px-3 py-2 border rounded" />
        <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">Create Admin</button>
      </form>

      {loading ? <p>Loading...</p> : admins.length === 0 ? (
        <p className="text-gray-500">No admins found</p>
      ) : (
        <ul className="space-y-2">
          {admins.map(a => (
            <li key={a.id} className="border p-3 rounded flex items-center justify-between">
              <div>
                <div className="font-semibold">{a.name} <span className="text-xs bg-gray-200 px-2 py-0.5 rounded ml-2">{a.role}</span></div>
                <div className="text-sm text-gray-500">{a.email}</div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => removeAdmin(a.id)} className="px-3 py-1 rounded text-xs bg-red-100 text-red-700">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminManagement;

