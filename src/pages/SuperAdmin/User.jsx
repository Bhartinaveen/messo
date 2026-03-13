import React, { useEffect, useState } from "react";
import { Search, Download, Shield, Ban, CheckCircle } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const User = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      const data = res.ok ? await res.json() : [];

      setUsers(Array.isArray(data) ? data : []);
      setFiltered(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchUsers failed", err);
      setUsers([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let f = [...users];

    if (query.trim()) {
      const q = query.toLowerCase();
      f = f.filter(
        (u) =>
          (u.name || "").toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q)
      );
    }

    if (roleFilter !== "all") {
      f = f.filter((u) => u.role === roleFilter);
    }

    setFiltered(f);
  }, [users, query, roleFilter]);

  const toggleBlock = async (id, block) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${id}/block`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ block }),
      });

      if (!res.ok) throw new Error("Action failed");

      fetchUsers();
    } catch (err) {
      alert(err.message || "Action failed");
    }
  };

  const exportCSV = () => {
    const rows = [["id", "name", "email", "role", "isBlocked", "createdAt"]];

    filtered.forEach((u) =>
      rows.push([
        u.id || "",
        u.name || "",
        u.email || "",
        u.role || "",
        u.isBlocked ? "true" : "false",
        u.createdAt || "",
      ])
    );

    const csv = rows
      .map((r) =>
        r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `users_${new Date().toISOString().slice(0, 10)}.csv`;

    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const totalUsers = users.length;
  const admins = users.filter((u) => u.role === "admin").length;
  const blocked = users.filter((u) => u.isBlocked).length;

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Shield size={22} />
          Users Management
        </h2>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total Users</p>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Admins</p>
          <p className="text-2xl font-bold">{admins}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Blocked Users</p>
          <p className="text-2xl font-bold">{blocked}</p>
        </div>

      </div>

      {/* Filters */}

      <div className="bg-white shadow rounded-xl p-4 flex flex-wrap gap-3 items-center">

        <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-72">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            placeholder="Search name or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none w-full"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>

      </div>

      {/* User List */}

      <div className="bg-white shadow rounded-xl p-4">

        {loading ? (
          <p className="text-center py-6">Loading users...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No users found</p>
        ) : (
          <>
            {/* Desktop Table */}

            <div className="hidden md:block overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-3">User</th>
                    <th className="text-left px-4 py-3">Email</th>
                    <th className="text-left px-4 py-3">Role</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id} className="border-t">

                      <td className="px-4 py-3 font-medium">{u.name}</td>

                      <td className="px-4 py-3 text-gray-500">{u.email}</td>

                      <td className="px-4 py-3">
                        <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded">
                          {u.role}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        {u.isBlocked ? (
                          <span className="text-red-600 text-xs font-medium">
                            Blocked
                          </span>
                        ) : (
                          <span className="text-green-600 text-xs font-medium">
                            Active
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleBlock(u.id, !u.isBlocked)}
                          className={`flex items-center gap-1 text-xs px-3 py-1 rounded ${
                            u.isBlocked
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {u.isBlocked ? (
                            <>
                              <CheckCircle size={14} />
                              Unblock
                            </>
                          ) : (
                            <>
                              <Ban size={14} />
                              Block
                            </>
                          )}
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

            {/* Mobile Cards */}

            <div className="grid gap-3 md:hidden">

              {filtered.map((u) => (
                <div
                  key={u.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >

                  <div>
                    <p className="font-semibold">{u.name}</p>

                    <p className="text-sm text-gray-500">{u.email}</p>

                    <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                      {u.role}
                    </span>

                    <p className="text-xs mt-1">
                      {u.isBlocked ? (
                        <span className="text-red-600">Blocked</span>
                      ) : (
                        <span className="text-green-600">Active</span>
                      )}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleBlock(u.id, !u.isBlocked)}
                    className={`text-xs px-3 py-1 rounded ${
                      u.isBlocked
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.isBlocked ? "Unblock" : "Block"}
                  </button>

                </div>
              ))}

            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default User;