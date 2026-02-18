import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users`, { headers: { Authorization: token ? `Bearer ${token}` : '' } });
      const data = await res.json();
      setUsers(data || []);
    } catch (err) {
      setUsers([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const toggleBlock = async (id, block) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${id}/block`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' }, body: JSON.stringify({ block }) });
      if (!res.ok) throw new Error('Action failed');
      fetchUsers();
    } catch (err) { alert(err.message || 'Action failed'); }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      {loading ? <p>Loading...</p> : users.length === 0 ? (
        <p className="text-gray-500">No users found</p>
      ) : (
        <ul className="space-y-2">
          {users.map((u) => (
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

export default Users;
