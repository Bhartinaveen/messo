import React from "react";

const TransactionTable = ({ data }) => {
  return (
    <div className="mt-6 bg-white rounded-xl shadow border overflow-hidden">

      {/* Scroll container */}
      <div className="overflow-x-auto max-h-[500px]">

        <table className="w-full text-sm">

          {/* Header */}
          <thead className="bg-gray-800 text-white sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Payment ID</th>
              <th className="p-3 text-left">Shipment</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Reason</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data?.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* Date */}
                  <td className="p-3 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>

                  {/* Type Badge */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          item.type === "refund"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.type === "expense"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  {/* Order ID */}
                  <td className="p-3 font-medium">
                    {item.orderId || "-"}
                  </td>

                  {/* Payment ID */}
                  <td className="p-3 text-gray-600">
                    {item.paymentId || "-"}
                  </td>

                  {/* Shipment */}
                  <td className="p-3">
                    {item.shipment ? (
                      <div className="text-xs">
                        <p className="font-medium">
                          {item.shipment.service}
                        </p>
                        <p className="text-gray-500">
                          AWB: {item.shipment.awb}
                        </p>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>

                  {/* Amount */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold
                        ${
                          item.amount > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                    >
                      {item.amount > 0
                        ? `+₹${item.amount}`
                        : `₹${item.amount}`}
                    </span>
                  </td>

                  {/* Reason */}
                  <td className="p-3 text-gray-600 max-w-[200px] truncate">
                    {item.reason || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-gray-500"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default TransactionTable;