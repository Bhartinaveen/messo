import React, { useEffect, useState } from "react";

/* ================== CONSTANTS ================== */

const STATUSES = [
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

/* ================== HELPERS ================== */

const statusBadge = (status) => {
  switch (status) {
    case "Processing":
      return "bg-yellow-100 text-yellow-700";
    case "Shipped":
      return "bg-blue-100 text-blue-700";
    case "Out for Delivery":
      return "bg-purple-100 text-purple-700";
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const statusIndex = (status) => {
  const i = STATUSES.indexOf(status);
  return i === -1 ? 0 : i;
};

const statusColor = (status) => {
  switch (status) {
    case "Processing":
      return "bg-yellow-500";
    case "Shipped":
      return "bg-blue-500";
    case "Out for Delivery":
      return "bg-purple-500";
    case "Delivered":
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
};

// Image resolver
const getItemImage = (image) => {
  if (!image) return null;

    // If already full URL or base64
  if (image.startsWith("http") || image.startsWith("data:image"))
    return image;

  // If from public folder (starts with /)
  if (image.startsWith("/")) return image;

  // Otherwise assume it's inside /public/image
  return `/image/${image}`;
};

/* ================== COMPONENT ================== */

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);
  }, []);

  const filteredOrders = orders.filter((o) => {
    const matchFilter = filter === "all" || o.status === filter;

    const matchSearch =
      o.id.toString().includes(search) ||
      o.items?.some((it) =>
        it.name.toLowerCase().includes(search.toLowerCase())
      );

    return matchFilter && matchSearch;
  });

  const saveStatus = () => {
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    const updated = saved.map((o) =>
      o.id === selected.id ? selected : o
    );

    localStorage.setItem("orders", JSON.stringify(updated));
    setOrders(updated);
    setSelected(null);

    setToast(`Order #${selected.id} marked as "${selected.status}"`);
    setTimeout(() => setToast(""), 3000);
  };

  if (!orders.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No orders yet
      </p>
    );
  }

  const canCancelOrder = (orderDate) => {
  const orderTime = new Date(orderDate).getTime();
  const now = new Date().getTime();
  const diff = now - orderTime;
  const hours24 = 24 * 60 * 60 * 1000;
  return diff <= hours24;
};

const handleListCancel = (order) => {
  if (!canCancelOrder(order.date)) {
    alert("Cancel allowed only within 24 hours");
    return;
  }

  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this order?"
  );

  if (!confirmCancel) return;

  const updatedOrder = { ...order, status: "Cancelled" };

  const saved = JSON.parse(localStorage.getItem("orders") || "[]");
  const updated = saved.map((o) =>
    o.id === order.id ? updatedOrder : o
  );

  localStorage.setItem("orders", JSON.stringify(updated));
  setOrders(updated);

  setToast(`Order #${order.id} has been Cancelled`);
  setTimeout(() => setToast(""), 3000);
};

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

      {/* 🔔 Toast */}
      {toast && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded shadow z-50">
          🔔 {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-2xl font-semibold">My Orders</h2>

        <div className="flex gap-2">
          <input
            placeholder="Search order or item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm w-full md:w-64"
          />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg px-4 py-2 text-sm w-full md:w-40"
            >
            <option value="all">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders list */}
      {filteredOrders.map((o) => (
       <div key={o.id} className="bg-white p-5 rounded-2xl shadow border">

          {/* Top Row */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">

            <div>
              <p className="font-semibold text-lg">
                Order #{o.id}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(o.date).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 text-xs rounded-full ${statusBadge(o.status)}`}>
                {o.status}
              </span>

            </div>
          </div>

       {/* Items Preview */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {o.items?.slice(0,4).map((item, i) => (
              <img
                key={i}
                src={getItemImage(item.image)}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-lg border"
              />
            ))}

            {o.items?.length > 4 && (
              <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg text-xs">
                +{o.items.length - 4}
              </div>
            )}
          </div>


          {/* Timeline */}
          <div className="flex items-center mt-5">
            {STATUSES.map((s, i) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className={`w-4 h-4 rounded-full ${
                    statusIndex(o.status) >= i
                      ? statusColor(s)
                      : "bg-gray-300"
                  }`}
                />
                {i < STATUSES.length - 1 && (
                  <div
                    className={`flex-1 h-1 ${
                      statusIndex(o.status) > i
                        ? statusColor(s)
                        : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>


          {/* Buttons */}
          <div className="flex justify-between items-center mt-5">

            <div className="text-sm text-gray-600">
              {o.items?.length} item(s)
            </div>

            <div className="flex gap-4">

              {o.status !== "Cancelled" && (
                <button
                  onClick={() => handleListCancel(o)}
                  className="text-red-500 text-sm font-medium hover:underline"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={() => setSelected(o)}
                className="text-orange-500 text-sm font-medium hover:underline"
              >
                View Details →
              </button>

            </div>

          </div>

        </div>
              ))}

      {/* ================= MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">

            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-1">
              Order #{selected.id}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(selected.date).toLocaleString()}
            </p>

            <div className="flex justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm ${statusBadge(selected.status)}`}>
                {selected.status}
              </span>
              <span className="text-xl font-bold">₹{selected.amount}</span>
            </div>

            {/* Timeline */}
            <div className="flex items-center mb-6">
              {STATUSES.map((s, i) => (
                <div key={s} className="flex-1 flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      statusIndex(selected.status) >= i
                        ? statusColor(s)
                        : "bg-gray-300"
                    }`}
                  />
                  {i < STATUSES.length - 1 && (
                    <div
                      className={`flex-1 h-1 ${
                        statusIndex(selected.status) > i
                          ? statusColor(s)
                          : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Items */}
            <h4 className="font-medium mb-3">Items</h4>
            <div className="space-y-3">
              {selected.items?.map((item, i) => (
                <div key={i} className="flex gap-4 bg-gray-50 rounded-xl p-3">
                  <div className="w-14 h-14 border rounded-lg flex items-center justify-center overflow-hidden bg-white">
                    {item.image ? (
                      <img
                        src={getItemImage(item.image)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-semibold text-gray-500">
                        {item.name?.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>

                  <p className="font-semibold">₹{item.price}</p>
                </div>
              ))}
            </div>

            {/* Merchant controls */}
            {user?.isMerchant && (
              <div className="mt-5 border-t pt-4">
                <select
                  value={selected.status}
                  onChange={(e) =>
                    setSelected({ ...selected, status: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 mb-3"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  <option value="Cancelled">Cancelled</option>
                </select>

                <button
                  onClick={saveStatus}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg"
                >
                  Save Status
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

// frontend/src/pages/Merchant/MyOrders.jsx
// import React, { useEffect, useState } from "react";

// /* ================== CONSTANTS ================== */

// const STATUSES = [
//   "Processing",
//   "Shipped",
//   "Out for Delivery",
//   "Delivered",
// ];

// /* ================== HELPERS ================== */

// const statusBadge = (status) => {
//   switch (status) {
//     case "Processing":
//       return "bg-yellow-100 text-yellow-700";
//     case "Shipped":
//       return "bg-blue-100 text-blue-700";
//     case "Out for Delivery":
//       return "bg-purple-100 text-purple-700";
//     case "Delivered":
//       return "bg-green-100 text-green-700";
//     case "Cancelled":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-gray-100 text-gray-600";
//   }
// };

// const statusIndex = (status) => {
//   const i = STATUSES.indexOf(status);
//   return i === -1 ? 0 : i;
// };

// const statusColor = (status) => {
//   switch (status) {
//     case "Processing":
//       return "bg-yellow-500";
//     case "Shipped":
//       return "bg-blue-500";
//     case "Out for Delivery":
//       return "bg-purple-500";
//     case "Delivered":
//       return "bg-green-500";
//     default:
//       return "bg-gray-300";
//   }
// };

// // Image resolver
// const getItemImage = (image) => {
//   if (!image) return "/image/placeholder-product.png"; // Fallback placeholder

//   // If already full URL or base64 (e.g., from S3 or local image data URL)
//   if (image.startsWith("http") || image.startsWith("data:image"))
//     return image;

//   // If from public folder (starts with /)
//   if (image.startsWith("/")) return image;

//   // Otherwise assume it's inside /public/image
//   return `/image/${image}`;
// };

// /* ================== COMPONENT ================== */

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [search, setSearch] = useState("");
//   const [selected, setSelected] = useState(null);
//   const [toast, setToast] = useState("");

//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const token = localStorage.getItem('token');
//   const BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         if (!token) {
//           // Handle unauthenticated state if necessary
//           return;
//         }
//         const res = await fetch(`${BASE_URL}/orders`, { // Fetch all orders for the user from backend
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const data = await res.json();
//         // Assuming data is { items: [...], total: ... }
//         setOrders(Array.isArray(data.items) ? data.items.filter(order => order.userId === user.id) : []); // Filter by current user
//       } catch (error) {
//         console.error("Failed to fetch orders:", error);
//         // Fallback to local storage if API fails or is not available
//         const saved = JSON.parse(localStorage.getItem("orders")) || [];
//         setOrders(saved);
//       }
//     };
//     fetchOrders();
//   }, [user?.id, token]); // Refetch when user or token changes

//   const filteredOrders = orders.filter((o) => {
//     const matchFilter = filter === "all" || o.status === filter;

//     const matchSearch =
//       o.id.toString().includes(search) ||
//       o.OrderProducts?.some((op) => // Use OrderProducts and nested product
//         op.product?.name.toLowerCase().includes(search.toLowerCase())
//       );

//     return matchFilter && matchSearch;
//   });

//   const saveStatus = async () => { // Made async
//     if (!selected) return;
//     try {
//       const res = await fetch(`${BASE_URL}/orders/${selected.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//         body: JSON.stringify({ status: selected.status }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || 'Failed to update order status.');

//       // Update orders state with the new data from API
//       setOrders(prevOrders => prevOrders.map(order => order.id === data.id ? data : order));
//       setSelected(null);
//       setToast(`Order #${data.id} marked as "${data.status}"`);
//       setTimeout(() => setToast(""), 3000);

//     } catch (error) {
//       console.error("Error saving status:", error);
//       alert(error.message || "Failed to update order status.");
//     }
//   };

//   const canCancelOrder = (orderDate) => {
//   const orderTime = new Date(orderDate).getTime();
//   const now = new Date().getTime();
//   const diff = now - orderTime;
//   const hours24 = 24 * 60 * 60 * 1000;
//   return diff <= hours24;
// };

// const handleListCancel = async (order) => { // Made async
//   if (!canCancelOrder(order.createdAt)) { // Use createdAt from backend
//     alert("Cancel allowed only within 24 hours of order placement.");
//     return;
//   }

//   const confirmCancel = window.confirm(
//     "Are you sure you want to cancel this order?"
//   );

//   if (!confirmCancel) return;

//   try {
//     const res = await fetch(`${BASE_URL}/orders/${order.id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//       body: JSON.stringify({ status: 'Cancelled' }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || 'Failed to cancel order.');

//     setOrders(prevOrders => prevOrders.map(o => o.id === data.id ? data : o));
//     setToast(`Order #${data.id} has been Cancelled`);
//     setTimeout(() => setToast(""), 3000);

//   } catch (error) {
//     console.error("Error cancelling order:", error);
//     alert(error.message || "Failed to cancel order.");
//   }
// };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

//       {/* 🔔 Toast */}
//       {toast && (
//         <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded shadow z-50">
//           🔔 {toast}
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//         <h2 className="text-2xl font-semibold">My Orders</h2>

//         <div className="flex gap-2">
//           <input
//             placeholder="Search order or item..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border rounded-lg px-4 py-2 text-sm w-full md:w-64"
//           />

//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border rounded-lg px-4 py-2 text-sm w-full md:w-40"
//             >
//             <option value="all">All</option>
//             {STATUSES.map((s) => (
//               <option key={s} value={s}>{s}</option>
//             ))}
//             <option value="Cancelled">Cancelled</option>
//           </select>
//         </div>
//       </div>

//       {/* Orders list */}
//       {filteredOrders.map((o) => (
//        <div key={o.id} className="bg-white p-5 rounded-2xl shadow border">

//           {/* Top Row */}
//           <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">

//             <div>
//               <p className="font-semibold text-lg">
//                 Order #{o.id}
//               </p>

//               <p className="text-sm text-gray-500">
//                 {new Date(o.createdAt).toLocaleString()} {/* Use createdAt */}
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               <span className={`px-3 py-1 text-xs rounded-full ${statusBadge(o.status)}`}>
//                 {o.status}
//               </span>

//             </div>
//           </div>

//        {/* Items Preview */}
//           <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
//             {o.OrderProducts?.slice(0,4).map((op, i) => ( // Use OrderProducts
//               <img
//                 key={i}
//                 src={getItemImage(op.product?.image)} // Access nested product image
//                 alt={op.product?.name}
//                 className="w-12 h-12 object-cover rounded-lg border"
//               />
//             ))}

//             {o.OrderProducts?.length > 4 && ( // Use OrderProducts
//               <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg text-xs">
//                 +{o.OrderProducts.length - 4}
//               </div>
//             )}
//           </div>


//           {/* Timeline */}
//           <div className="flex items-center mt-5">
//             {STATUSES.map((s, i) => (
//               <div key={s} className="flex-1 flex items-center">
//                 <div
//                   className={`w-4 h-4 rounded-full ${
//                     statusIndex(o.status) >= i
//                       ? statusColor(s)
//                       : "bg-gray-300"
//                   }`}
//                 />
//                 {i < STATUSES.length - 1 && (
//                   <div
//                     className={`flex-1 h-1 ${
//                       statusIndex(o.status) > i
//                         ? statusColor(s)
//                         : "bg-gray-300"
//                     }`}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>


//           {/* Buttons */}
//           <div className="flex justify-between items-center mt-5">

//             <div className="text-sm text-gray-600">
//               {o.OrderProducts?.length} item(s) {/* Use OrderProducts */}
//             </div>

//             <div className="flex gap-4">

//               {o.status !== "Cancelled" && (
//                 <button
//                   onClick={() => handleListCancel(o)}
//                   className="text-red-500 text-sm font-medium hover:underline"
//                 >
//                   Cancel
//                 </button>
//               )}

//               <button
//                 onClick={() => setSelected(o)}
//                 className="text-orange-500 text-sm font-medium hover:underline"
//               >
//                 View Details →
//               </button>

//             </div>

//           </div>

//         </div>
//               ))}

//       {/* ================= MODAL ================= */}
//       {selected && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">

//             <button
//               onClick={() => setSelected(null)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
//             >
//               ✕
//             </button>

//             <h3 className="text-xl font-semibold mb-1">
//               Order #{selected.id}
//             </h3>
//             <p className="text-sm text-gray-500 mb-4">
//               {new Date(selected.createdAt).toLocaleString()} {/* Use createdAt */}
//             </p>

//             <div className="flex justify-between mb-4">
//               <span className={`px-3 py-1 rounded-full text-sm ${statusBadge(selected.status)}`}>
//                 {selected.status}
//               </span>
//               <span className="text-xl font-bold">₹{selected.totalAmount?.toFixed(2)}</span> {/* Use totalAmount */}
//             </div>

//             {/* Timeline */}
//             <div className="flex items-center mb-6">
//               {STATUSES.map((s, i) => (
//                 <div key={s} className="flex-1 flex items-center">
//                   <div
//                     className={`w-4 h-4 rounded-full ${
//                       statusIndex(selected.status) >= i
//                         ? statusColor(s)
//                         : "bg-gray-300"
//                     }`}
//                   />
//                   {i < STATUSES.length - 1 && (
//                     <div
//                       className={`flex-1 h-1 ${
//                         statusIndex(selected.status) > i
//                           ? statusColor(s)
//                           : "bg-gray-300"
//                       }`}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Items */}
//             <h4 className="font-medium mb-3">Items</h4>
//             <div className="space-y-3">
//               {selected.OrderProducts?.map((op, i) => ( // Use OrderProducts
//                 <div key={i} className="flex gap-4 bg-gray-50 rounded-xl p-3">
//                   <div className="w-14 h-14 border rounded-lg flex items-center justify-center overflow-hidden bg-white">
//                     {op.product?.image ? ( // Access nested product image
//                       <img
//                         src={getItemImage(op.product?.image)}
//                         alt={op.product?.name}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <span className="text-lg font-semibold text-gray-500">
//                         {op.product?.name?.charAt(0)}
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex-1">
//                     <p className="font-medium">{op.product?.name}</p> {/* Access nested product name */}
//                     <p className="text-sm text-gray-500">Qty: {op.quantity}</p>
//                   </div>

//                   <p className="font-semibold">₹{op.price?.toFixed(2)}</p> {/* Use price from OrderProduct */}
//                 </div>
//               ))}
//             </div>

//             {/* Shipping Address */}
//             {selected.shippingAddress && (
//               <div className="mt-5 border-t pt-4">
//                 <h4 className="font-medium mb-2">Shipping Address</h4>
//                 <p className="text-sm text-gray-700">
//                   {selected.shippingAddress.addressLine1}, {selected.shippingAddress.addressLine2 && `${selected.shippingAddress.addressLine2}, `}
//                   {selected.shippingAddress.city}, {selected.shippingAddress.state} - {selected.shippingAddress.postalCode}
//                 </p>
//                 <p className="text-sm text-gray-500">{selected.shippingAddress.country}</p>
//                 <p className="text-sm text-gray-500">Contact: {selected.User?.phone || 'N/A'}</p> {/* Assuming User model has phone */}
//               </div>
//             )}

//             {/* Payment Method */}
//             <div className="mt-5 border-t pt-4">
//               <h4 className="font-medium mb-2">Payment Details</h4>
//               <p className="text-sm text-gray-700">Method: {selected.paymentMethod}</p>
//               <p className="text-sm text-gray-700">Paid: {selected.isPaid ? 'Yes' : 'No'}</p>
//               {selected.isRefunded && <p className="text-sm text-red-600">Refunded: Yes (Reason: {selected.refundReason || 'N/A'})</p>}
//             </div>

//             {/* Merchant controls */}
//             {user?.isAdmin && ( // Changed to isAdmin to include superadmin
//               <div className="mt-5 border-t pt-4">
//                 <select
//                   value={selected.status}
//                   onChange={(e) =>
//                     setSelected({ ...selected, status: e.target.value })
//                   }
//                   className="w-full border rounded-lg p-2 mb-3"
//                 >
//                   {STATUSES.map((s) => (
//                     <option key={s} value={s}>{s}</option>
//                   ))}
//                   <option value="Cancelled">Cancelled</option>
//                 </select>

//                 <button
//                   onClick={saveStatus}
//                   className="w-full bg-orange-500 text-white py-2 rounded-lg"
//                 >
//                   Save Status
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;
