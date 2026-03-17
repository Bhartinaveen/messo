import React, { useEffect, useState } from "react";

const STATUSES = [
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const statusColors = {
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  "Out for Delivery": "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // This fetch request to `${BASE_URL}/orders` is already designed to retrieve all orders.
      // Assuming your backend API at `${BASE_URL}/orders` returns all orders when accessed by a SuperAdmin,
      // this is the correct query for the frontend.
      const res = await fetch(`${BASE_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data.items || []);
    } catch (err) {
      console.error(err);
      // Optionally, set an error toast/message here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders
    .filter((o) => {
      const matchFilter = filter === "all" || o.status === filter;
      const matchSearch =
        o.id.toString().includes(search) ||
        o.User?.name?.toLowerCase().includes(search.toLowerCase()) ||
        o.OrderProducts?.some((item) =>
          item.product?.name?.toLowerCase().includes(search.toLowerCase())
        );
      return matchFilter && matchSearch;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${BASE_URL}/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const updated = await res.json();

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? updated : o))
      );

      setToast(`Order #${id} → ${status}`);
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded shadow-lg">
          {toast}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">📦 Orders Management</h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          placeholder="Search by order id, user, product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/2 shadow-sm"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm"
        >
          <option value="all">All Status</option>
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading orders...</p>}

      {/* Orders List */}
      <div className="grid gap-4">
        {filteredOrders.map((o) => (
          <div
            key={o.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition p-5 border"
          >

            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between gap-4">

              <div>
                <p className="font-semibold text-lg">
                  Order #{o.id}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(o.createdAt).toLocaleString()}
                </p>
                <p className="text-sm mt-1">
                  👤 {o.User?.name}
                </p>

                {/* Status Badge */}
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${statusColors[o.status]}`}
                >
                  {o.status}
                </span>
              </div>

              {/* Status Dropdown */}
              <div className="flex flex-col items-end gap-2">
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                  className="border px-3 py-2 rounded"
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>

                <button
                  onClick={() => setSelected(o)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Details →
                </button>
              </div>
            </div>

            {/* Items Preview */}
            <div className="mt-4 border-t pt-3 text-sm space-y-1">
              {o.OrderProducts?.slice(0, 2).map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span>
                    {item.product?.name} × {item.quantity}
                  </span>
                  <span>₹{item.price}</span>
                </div>
              ))}

              {o.OrderProducts?.length > 2 && (
                <p className="text-gray-400 text-xs">
                  + {o.OrderProducts.length - 2} more items
                </p>
              )}
            </div>

            {/* Total */}
            <div className="text-right font-bold mt-3 text-lg">
              ₹{o.totalAmount}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">

            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✖
            </button>

            <h3 className="text-xl font-bold mb-4">
              Order #{selected.id}
            </h3>

            <p className="text-sm text-gray-500 mb-3">
              {new Date(selected.createdAt).toLocaleString()}
            </p>

            <div className="space-y-2">
              {selected.OrderProducts?.map((op, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{op.product?.name}</span>
                  <span>₹{op.price}</span>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-3 font-bold text-right">
              Total: ₹{selected.totalAmount}
            </div>

            <p className="mt-3 text-sm">
              👤 {selected.User?.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
