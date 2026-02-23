import React, { useState } from "react";

const dummyLogs = [
  {
    id: 1,
    action: "Customer Login",
    role: "customer",
    ipAddress: "192.168.1.10",
    status: "Success",
    date: "24 Feb 2026, 10:20 AM",
  },
  {
    id: 2,
    action: "Admin Product Deleted",
    role: "admin",
    ipAddress: "103.45.22.11",
    status: "Success",
    date: "24 Feb 2026, 09:45 AM",
  },
  {
    id: 3,
    action: "Failed Login Attempt",
    role: "customer",
    ipAddress: "88.12.45.90",
    status: "Failed",
    date: "23 Feb 2026, 08:15 PM",
  },
  {
    id: 4,
    action: "SuperAdmin Updated Settings",
    role: "superadmin",
    ipAddress: "192.168.1.5",
    status: "Success",
    date: "23 Feb 2026, 06:40 PM",
  },
];

const SecurityLogs = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table"); // table | card

  const filteredLogs = dummyLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.role.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "all" ? true : log.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">Security Logs</h2>
          <p className="text-sm text-gray-500">
            Monitor system login activity and role-based actions.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded-lg text-sm ${
              viewMode === "table"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Table View
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 rounded-lg text-sm ${
              viewMode === "card"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Card View
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by action or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Roles</option>
          <option value="customer">Customer</option>
          <option value="admin">Admin (Vendor)</option>
          <option value="superadmin">Super Admin</option>
        </select>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">IP Address</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                    No logs found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="border-t">
                    <td className="px-4 py-3">{log.action}</td>
                    <td className="px-4 py-3 capitalize">{log.role}</td>
                    <td className="px-4 py-3">{log.ipAddress}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          log.status === "Success"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{log.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View */}
      {viewMode === "card" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLogs.length === 0 ? (
            <div className="text-gray-500">No logs found.</div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="bg-white shadow rounded-xl p-4 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{log.action}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      log.status === "Success"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Role:</strong> {log.role}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>IP:</strong> {log.ipAddress}
                </p>
                <p className="text-xs text-gray-400">{log.date}</p>
              </div>
            ))
          )}
        </div>
      )}

      <div className="text-sm text-gray-500">
        Showing {filteredLogs.length} of {dummyLogs.length} logs
      </div>
    </div>
  );
};

export default SecurityLogs;