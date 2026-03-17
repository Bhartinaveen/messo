import React, { useEffect, useState } from "react";

const PER_PAGE = 8;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const token = localStorage.getItem("token");

  /* 🔥 FETCH ORDERS */
  const fetchOrders = async (p = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/orders?page=${p}&limit=${PER_PAGE}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = await res.json();

      setOrders(Array.isArray(data.items) ? data.items : []);
      setTotal(typeof data.total === "number" ? data.total : 0);
    } catch (err) {
      console.error(err);
      setOrders([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page, token, toast]); // Added toast to re-fetch after status update

  /* 🎯 STATUS BADGE */
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  /* 🔄 UPDATE STATUS */
  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${BASE_URL}/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Update failed");

      setToast(`Order #${id} → ${status}`);
      fetchOrders(page);
    } catch (err) {
      setToast(err.message || "Update failed");
    } finally {
      setUpdatingId(null);
      setTimeout(() => setToast(""), 3000);
    }
  };

  /* 💸 REFUND */
  const refundOrder = async (id) => {
    const reason = prompt("Enter refund reason");
    if (!reason) return;

    setUpdatingId(id);
    try {
      const res = await fetch(`${BASE_URL}/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          isRefunded: true,
          refundReason: reason,
        }),
      });

      if (!res.ok) throw new Error("Refund failed");

      setToast(`Order #${id} refunded`);
      fetchOrders(page);
    } catch (err) {
      setToast(err.message || "Refund failed");
    } finally {
      setUpdatingId(null);
      setTimeout(() => setToast(""), 3000);
    }
  };

  /* 📄 PAGINATION */
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const startIndex = (page - 1) * PER_PAGE + 1;
  const endIndex = Math.min(page * PER_PAGE, total);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded">
          {toast}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <>
          {/* Count */}
          <div className="text-sm text-gray-600 mb-2">
            Showing {startIndex} - {endIndex} of {total} orders
          </div>

          {/* Orders */}
          <div className="max-h-[60vh] overflow-y-auto pr-2 flex flex-col gap-4">
            {orders.map((o) => (
              <div key={o.id} className="border p-4 rounded flex gap-4">

                {/* LEFT */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="font-semibold">#{o.id}</span>

                    <span className="text-sm text-gray-500">
                      {o.User?.name || "User"}
                    </span>

                    <span className="font-semibold">
                      ₹{o.totalAmount}
                    </span>

                    <span className={`px-2 py-1 text-xs rounded ${getStatusColor(o.status)}`}>
                      {o.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="text-xs text-gray-500 mt-2">
                    {o.OrderProducts?.map((op, i) => (
                      <div key={i}>
                        {op.product?.name} × {op.quantity}
                      </div>
                    ))}
                  </div>

                  {/* Address */}
                  {o.shippingAddress && (
                    <div className="text-xs mt-2 text-gray-500">
                      {o.shippingAddress.addressLine1},{" "}
                      {o.shippingAddress.city},{" "}
                      {o.shippingAddress.state}
                    </div>
                  )}

                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(o.createdAt).toLocaleString()}
                  </div>
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex flex-col gap-2">

                  <button
                    disabled={updatingId === o.id}
                    onClick={() => updateStatus(o.id, "Shipped")}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-xs"
                  >
                    Ship
                  </button>

                  <button
                    disabled={updatingId === o.id}
                    onClick={() => updateStatus(o.id, "Delivered")}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs"
                  >
                    Deliver
                  </button>

                  {o.isRefunded ? (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      Refunded
                    </span>
                  ) : (
                    <button
                      disabled={updatingId === o.id}
                      onClick={() => refundOrder(o.id)}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs"
                    >
                      Refund
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-2">
            <button onClick={() => goToPage(page - 1)}>
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => goToPage(i + 1)}>
                {i + 1}
              </button>
            ))}

            <button onClick={() => goToPage(page + 1)}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrders;