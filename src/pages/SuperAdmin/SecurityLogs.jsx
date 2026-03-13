import React, { useEffect, useState } from "react";
import {
  Shield,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SecurityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/super-admin/security-logs`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error("Failed to fetch logs", err);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action?.toLowerCase().includes(search.toLowerCase()) ||
      log.role?.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "all" ? true : log.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getStatusBadge = (status) => {
    if (status === "Success")
      return (
        <span className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
          <CheckCircle size={14} /> Success
        </span>
      );

    return (
      <span className="flex items-center gap-1 text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs">
        <XCircle size={14} /> Failed
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const colors = {
      customer: "bg-blue-100 text-blue-600",
      admin: "bg-yellow-100 text-yellow-700",
      superadmin: "bg-purple-100 text-purple-700",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs capitalize ${
          colors[role] || "bg-gray-100 text-gray-600"
        }`}
      >
        {role}
      </span>
    );
  };

  if (loading)
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center">
        Loading security logs...
      </div>
    );

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield size={24} /> Security Logs
          </h2>
          <p className="text-sm text-gray-500">
            Monitor login activity and admin actions.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded-lg text-sm ${
              viewMode === "table"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Table
          </button>

          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 rounded-lg text-sm ${
              viewMode === "card"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Cards
          </button>
        </div>
      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-3">

        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Roles</option>
          <option value="customer">Customer</option>
          <option value="admin">Vendor/Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>

      </div>

      {/* TABLE VIEW */}

      {viewMode === "table" && (
        <div className="bg-white shadow rounded-xl overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-gray-600 text-xs uppercase sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left">Action</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">IP Address</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>

              {filteredLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500"
                  >
                    No logs found
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      {log.action}
                    </td>

                    <td className="px-4 py-3">
                      {getRoleBadge(log.role)}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {log.ipAddress}
                    </td>

                    <td className="px-4 py-3">
                      {getStatusBadge(log.status)}
                    </td>

                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      )}

      {/* CARD VIEW */}

      {viewMode === "card" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {filteredLogs.length === 0 ? (
            <div className="text-gray-500">No logs found</div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log._id}
                className="bg-white shadow rounded-xl p-4 hover:shadow-md transition space-y-2"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold flex items-center gap-2">
                    <AlertTriangle size={16} />
                    {log.action}
                  </h3>

                  {getStatusBadge(log.status)}
                </div>

                <p className="text-sm text-gray-600">
                  Role: {getRoleBadge(log.role)}
                </p>

                <p className="text-sm text-gray-600">
                  IP: {log.ipAddress}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(log.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}

        </div>
      )}

      {/* Footer */}

      <div className="text-sm text-gray-500">
        Showing {filteredLogs.length} of {logs.length} logs
      </div>

    </div>
  );
};

export default SecurityLogs;