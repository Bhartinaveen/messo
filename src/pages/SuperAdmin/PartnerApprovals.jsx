import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  CheckCircle,
  XCircle,
  Store,
  Search,
  Eye,
  FileText,
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PartnerApprovals = () => {
  const { token } = useAuth();

  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedPartner, setSelectedPartner] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ---------------- FETCH ---------------- */

  const fetchPartners = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/super-admin/partners?status=all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      const filtered = (data.items || []).filter((p) => p.role === "admin");

      setPartners(filtered);
    } catch (err) {
      setError("Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [token]);

  /* ---------------- APPROVAL ---------------- */

  const handleApproval = async (id, approve) => {
    if (!window.confirm(`Confirm ${approve ? "approval" : "rejection"}?`))
      return;

    try {
      const res = await fetch(
        `${BASE_URL}/super-admin/partners/${id}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isApproved: approve }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessage(`Partner ${approve ? "approved" : "rejected"} successfully`);

      fetchPartners();

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  /* ---------------- FILTER ---------------- */

  const filteredPartners = partners
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => {
      if (filter === "pending") return !p.isApproved;
      if (filter === "approved") return p.isApproved;
      return true;
    });

  const stats = {
    total: partners.length,
    pending: partners.filter((p) => !p.isApproved).length,
    approved: partners.filter((p) => p.isApproved).length,
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold">Seller Approvals</h2>
          <p className="text-gray-500 text-sm">
            Manage seller registrations for your marketplace
          </p>
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Total Sellers</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-yellow-50 p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Pending Approval</p>
          <p className="text-2xl font-bold text-yellow-600">
            {stats.pending}
          </p>
        </div>

        <div className="bg-green-50 p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Approved Sellers</p>
          <p className="text-2xl font-bold text-green-600">
            {stats.approved}
          </p>
        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">

        <div className="relative max-w-md w-full">

          <Search className="absolute left-3 top-3 text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Search seller..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />

        </div>

        <div className="flex gap-2 flex-wrap">

          {["all", "pending", "approved"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1 rounded-lg text-sm ${
                filter === type
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}

        </div>

      </div>

      {/* MESSAGE */}

      {message && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* PARTNER LIST */}

      <div className="bg-white rounded-xl shadow border">

        {loading ? (
          <p className="p-6 text-gray-500">Loading sellers...</p>
        ) : filteredPartners.length === 0 ? (
          <p className="p-6 text-gray-500">No sellers found</p>
        ) : (
          <div className="divide-y">

            {filteredPartners.map((p) => (

              <div
                key={p.id}
                className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50"
              >

                {/* LEFT */}

                <div className="flex items-center gap-4">

                  <div className="bg-indigo-100 p-3 rounded-full">
                    <Store className="text-indigo-600" size={20} />
                  </div>

                  <div>
                    <p className="font-semibold">{p.name}</p>

                    <p className="text-sm text-gray-500">{p.email}</p>

                    <p className="text-xs text-gray-400">
                      Store: {p.storeName || "N/A"}
                    </p>

                    <p className="text-xs text-gray-400">
                      Joined:{" "}
                      {new Date(p.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                </div>

                {/* STATUS */}

                <div>
                  <span
                    className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${
                      p.isApproved
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.isApproved ? (
                      <CheckCircle size={14} />
                    ) : (
                      <XCircle size={14} />
                    )}
                    {p.isApproved ? "Approved" : "Pending"}
                  </span>
                </div>

                {/* ACTIONS */}

                <div className="flex gap-2 flex-wrap">

                  <button
                    onClick={() => setSelectedPartner(p)}
                    className="px-3 py-1 bg-gray-200 rounded flex items-center gap-1 text-sm"
                  >
                    <Eye size={14} /> View
                  </button>

                  {p.gstDoc && (
                    <a
                      href={p.gstDoc}
                      target="_blank"
                      className="px-3 py-1 bg-blue-500 text-white rounded flex items-center gap-1 text-sm"
                    >
                      <FileText size={14} /> GST
                    </a>
                  )}

                  {p.panDoc && (
                    <a
                      href={p.panDoc}
                      target="_blank"
                      className="px-3 py-1 bg-purple-500 text-white rounded flex items-center gap-1 text-sm"
                    >
                      <FileText size={14} /> PAN
                    </a>
                  )}

                  {!p.isApproved ? (
                    <button
                      onClick={() => handleApproval(p.id, true)}
                      className="px-3 py-1 bg-green-600 text-white rounded flex items-center gap-1 text-sm"
                    >
                      <CheckCircle size={14} /> Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApproval(p.id, false)}
                      className="px-3 py-1 bg-red-600 text-white rounded flex items-center gap-1 text-sm"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  )}

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* MODAL */}

      {selectedPartner && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">

            <h3 className="text-lg font-semibold mb-4">
              Seller Details
            </h3>

            <div className="space-y-2 text-sm">

              <p><b>Name:</b> {selectedPartner.name}</p>
              <p><b>Email:</b> {selectedPartner.email}</p>
              <p><b>Store:</b> {selectedPartner.storeName}</p>
              <p>
                <b>Registered:</b>{" "}
                {new Date(selectedPartner.createdAt).toLocaleDateString()}
              </p>

              <p><b>GST:</b> {selectedPartner.gstNumber || "N/A"}</p>
              <p><b>PAN:</b> {selectedPartner.panNumber || "N/A"}</p>

            </div>

            <div className="mt-6 text-right">

              <button
                onClick={() => setSelectedPartner(null)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default PartnerApprovals;