import React from "react";

const OrderFilters = ({ filters, setFilters, onSearch }) => {
  const handleReset = () => {
    setFilters({
      orderId: "",
      email: "",
      status: "",
      page: 1,
    });
  };

  return (
    <div className="bg-white border shadow rounded-xl p-4 flex flex-wrap gap-4">

      <input
        type="text"
        placeholder="Order ID"
        className="p-2 border rounded text-sm"
        value={filters.orderId}
        onChange={(e) =>
          setFilters({ ...filters, orderId: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Customer Email"
        className="p-2 border rounded text-sm"
        value={filters.email}
        onChange={(e) =>
          setFilters({ ...filters, email: e.target.value })
        }
      />

      <select
        className="p-2 border rounded text-sm"
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <button
        onClick={handleReset}
        className="px-4 py-2 border rounded text-sm"
      >
        Reset
      </button>

      <button
        onClick={onSearch}
        className="px-4 py-2 bg-black text-white rounded text-sm"
      >
        Search
      </button>
    </div>
  );
};

export default OrderFilters;