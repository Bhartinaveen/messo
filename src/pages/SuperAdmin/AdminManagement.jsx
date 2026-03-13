import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { UserPlus, Trash2, Shield } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminManagement = () => {
  const { token } = useAuth();

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fetchAdmins = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/super-admin/admins`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();
      setAdmins(data || []);
    } catch {
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const createAdmin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/super-admin/admins`, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Create failed");

      setForm({ name: "", email: "", password: "" });

      fetchAdmins();
    } catch (err) {
      alert(err.message || "Create failed");
    }
  };

  const removeAdmin = async (id) => {
    if (!window.confirm("Delete this admin?")) return;

    try {
      const res = await fetch(`${BASE_URL}/super-admin/admins/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      fetchAdmins();
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  const filteredAdmins = admins.filter(
    (a) =>
      a.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Shield size={22} />
          Admin Management
        </h2>

        <div className="text-sm text-gray-500">
          Total Admins: {admins.length}
        </div>
      </div>

      {/* Create Admin */}

      <div className="bg-white shadow rounded-xl p-5">

        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <UserPlus size={18} />
          Create New Admin
        </h3>

        <form
          onSubmit={createAdmin}
          className="grid grid-cols-1 md:grid-cols-4 gap-3"
        >

          <input
            value={form.name}
            required
            onChange={(e) =>
              setForm((s) => ({ ...s, name: e.target.value }))
            }
            placeholder="Admin Name"
            className="px-3 py-2 border rounded-lg"
          />

          <input
            value={form.email}
            required
            type="email"
            onChange={(e) =>
              setForm((s) => ({ ...s, email: e.target.value }))
            }
            placeholder="Email Address"
            className="px-3 py-2 border rounded-lg"
          />

          <input
            value={form.password}
            required
            type="password"
            onChange={(e) =>
              setForm((s) => ({ ...s, password: e.target.value }))
            }
            placeholder="Password"
            className="px-3 py-2 border rounded-lg"
          />

          <button
            type="submit"
            className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
          >
            Create Admin
          </button>

        </form>
      </div>

      {/* Search */}

      <div className="flex justify-between flex-wrap gap-3">

        <input
          type="text"
          placeholder="Search admins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-72"
        />

      </div>

      {/* Admin List */}

      <div className="bg-white shadow rounded-xl p-4">

        {loading ? (
          <p className="text-center py-6">Loading admins...</p>
        ) : filteredAdmins.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No admins found
          </p>
        ) : (
          <>
            {/* Desktop Table */}

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">

                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-3">Name</th>
                    <th className="text-left px-4 py-3">Email</th>
                    <th className="text-left px-4 py-3">Role</th>
                    <th className="text-left px-4 py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAdmins.map((a) => (
                    <tr key={a.id} className="border-t">

                      <td className="px-4 py-3 font-medium">
                        {a.name}
                      </td>

                      <td className="px-4 py-3 text-gray-500">
                        {a.email}
                      </td>

                      <td className="px-4 py-3">
                        <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded">
                          {a.role}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeAdmin(a.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Mobile Cards */}

            <div className="grid gap-3 md:hidden">
              {filteredAdmins.map((a) => (
                <div
                  key={a.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{a.name}</p>
                    <p className="text-sm text-gray-500">{a.email}</p>
                    <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                      {a.role}
                    </span>
                  </div>

                  <button
                    onClick={() => removeAdmin(a.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={18} />
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

export default AdminManagement;