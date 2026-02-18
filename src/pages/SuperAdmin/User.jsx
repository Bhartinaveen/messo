import React, { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SuperUsers = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users`, { headers: { Authorization: token ? `Bearer ${token}` : '' } });
      const data = res.ok ? await res.json() : [];
      setUsers(Array.isArray(data) ? data : []);
      setFiltered(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('fetchUsers failed', err);
      setUsers([]);
      setFiltered([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  useEffect(() => {
    let f = [...users];
    if (query.trim()) {
      const q = query.toLowerCase();
      f = f.filter(u => (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q));
    }
    if (roleFilter !== 'all') {
      f = f.filter(u => u.role === roleFilter);
    }
    setFiltered(f);
  }, [users, query, roleFilter]);

  const toggleBlock = async (id, block) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${id}/block`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' }, body: JSON.stringify({ block }) });
      if (!res.ok) throw new Error('Action failed');
      fetchUsers();
    } catch (err) { alert(err.message || 'Action failed'); }
  };

  const exportCSV = () => {
    const rows = [['id','name','email','role','isBlocked','createdAt']];
    filtered.forEach(u => rows.push([u.id||'', u.name||'', u.email||'', u.role||'', u.isBlocked ? 'true' : 'false', u.createdAt || '']));
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `superadmin_users_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Users Management</h2>
        <div className="flex items-center gap-2">
          <input placeholder="Search by name or email" value={query} onChange={(e) => setQuery(e.target.value)} className="px-3 py-2 border rounded" />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-3 py-2 border rounded">
            <option value="all">All roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
          <button onClick={exportCSV} className="px-3 py-2 rounded bg-indigo-600 text-white">Export CSV</button>
        </div>
      </div>

      {loading ? <p>Loading...</p> : filtered.length === 0 ? (
        <p className="text-gray-500">No users found</p>
      ) : (
        <ul className="space-y-2">
          {filtered.map((u) => (
            <li key={u.id} className="border p-3 rounded flex items-center justify-between">
              <div>
                <div className="font-semibold">{u.name} {u.role === 'superadmin' ? <span className="text-xs bg-black text-white px-2 py-0.5 rounded ml-2">Super Admin</span> : u.role === 'admin' ? <span className="text-xs bg-gray-200 px-2 py-0.5 rounded ml-2">Admin</span> : null}</div>
                <div className="text-sm text-gray-500">{u.email}</div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => toggleBlock(u.id, !u.isBlocked)} className={`px-3 py-1 rounded text-xs ${u.isBlocked ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {u.isBlocked ? 'Unblock' : 'Block'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuperUsers;
