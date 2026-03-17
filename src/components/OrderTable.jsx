import React from "react";

const OrderTable = ({ data }) => {
  return (
    <div className="mt-6 bg-white rounded-xl shadow border overflow-hidden">
      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Products</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {data?.length > 0 ? (
              data.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">

                  <td className="p-3">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>

                  <td className="p-3 font-medium">
                    {order.orderId}
                  </td>

                  <td className="p-3">
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-gray-500 text-xs">
                      {order.customerEmail}
                    </p>
                  </td>

                  <td className="p-3 text-xs">
                    {order.items?.map((item, i) => (
                      <p key={i}>
                        {item.name} × {item.qty}
                      </p>
                    ))}
                  </td>

                  <td className="p-3 font-semibold">
                    ₹{order.totalAmount}
                  </td>

                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "cancelled"
                        ? "bg-gray-200 text-gray-600"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default OrderTable;