import React, { useEffect, useState } from "react";

const PER_PAGE = 8;

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const [page, setPage] = useState(1);

  const fetchOrders = async (p = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/orders?page=${p}&limit=${PER_PAGE}`, { headers: { Authorization: token ? `Bearer ${token}` : '' } });
      const data = await res.json();
      setOrders(Array.isArray(data.items) ? data.items : []);
      setTotal(typeof data.total === 'number' ? data.total : 0);
    } catch (err) {
      console.error(err);
      setOrders([]);
      setTotal(0);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(page); }, [page]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${BASE_URL}/orders/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' }, body: JSON.stringify({ status }) });
      if (!res.ok) throw new Error('Update failed');
      fetchOrders(page);
    } catch (err) { alert(err.message || 'Update failed'); }
  };

  const refundOrder = async (id) => {
    const reason = prompt('Enter refund reason');
    if (!reason) return;
    try {
      const res = await fetch(`${BASE_URL}/orders/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' }, body: JSON.stringify({ isRefunded: true, refundReason: reason }) });
      if (!res.ok) throw new Error('Refund failed');
      fetchOrders(page);
    } catch (err) { alert(err.message || 'Refund failed'); }
  };

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const startIndex = (page - 1) * PER_PAGE;
  const endIndex = Math.min(page * PER_PAGE, total);
  const visibleOrders = orders; // server provides current page

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    // ensure scroll to top of orders list when page changes
    const el = document.getElementById('admin-orders-list');
    if (el) el.scrollTop = 0;
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <>
          <div className="text-sm text-gray-600 mb-2">Showing {Math.min(startIndex + 1, orders.length)} - {Math.min(endIndex, orders.length)} of {orders.length} orders</div>

          <div id="admin-orders-list" className="max-h-[60vh] overflow-y-auto pr-2">
            <div className="flex flex-col gap-4">
              {visibleOrders.map((o) => (
                <div key={o.id} className="border p-4 rounded bg-white flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="font-semibold truncate">Order #{o.id}</div>
                      <div className="text-sm text-gray-500 truncate">User: {o.User?.name || o.userId}</div>
                      <div className="text-sm truncate">₹{o.totalPrice}</div>
                      <div className={`text-sm px-2 py-1 rounded ${o.status === 'Delivered' ? 'bg-green-100 text-green-600 text-xs' : 'bg-yellow-100 text-yellow-700 text-xs'}`}>{o.status}</div>
                    </div>

                    <div className="text-xs text-gray-500 mt-2">Items: {Array.isArray(o.items) ? o.items.map(it => it.productId || it.id).join(', ') : 'N/A'}</div>
                    {o.createdAt && <div className="text-xs text-gray-400 mt-1">{new Date(o.createdAt).toLocaleString()}</div>}
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button onClick={() => updateStatus(o.id, 'Shipped')} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">Mark Shipped</button>
                    <button onClick={() => updateStatus(o.id, 'Delivered')} className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs">Mark Delivered</button>
                    <button onClick={() => refundOrder(o.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs">Refund</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <button onClick={() => goToPage(page - 1)} disabled={page === 1} className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white border'}`}>Prev</button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <button key={p} onClick={() => goToPage(p)} className={`px-3 py-1 rounded ${p === page ? 'bg-indigo-500 text-white' : 'bg-white border text-black'}`}>{p}</button>
              );
            })}

            <button onClick={() => goToPage(page + 1)} disabled={page === totalPages} className={`px-3 py-1 rounded ${page === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white border'}`}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
