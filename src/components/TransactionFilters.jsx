import React from "react";

const TransactionFilters = ({ filters, setFilters, onSearch }) => {
  
  const handleReset = () => {
    setFilters({
      type: "",
      orderId: "",
      awb: "",
      from: "",
      to: "",
      page: 1,
    });
  };

  return (
    <div className="bg-white border shadow rounded-2xl p-4 flex flex-wrap gap-4 items-end">

      {/* Type */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Type</label>
        <select
          className="p-2 rounded border text-sm"
          value={filters.type}
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
        >
          <option value="">All</option>
          <option value="manual">Manual</option>
          <option value="refund">Refund</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Order ID */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Order ID</label>
        <input
          type="text"
          placeholder="Enter Order ID"
          className="p-2 rounded border text-sm"
          value={filters.orderId}
          onChange={(e) =>
            setFilters({ ...filters, orderId: e.target.value })
          }
        />
      </div>

      {/* AWB */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">AWB</label>
        <input
          type="text"
          placeholder="Enter AWB"
          className="p-2 rounded border text-sm"
          value={filters.awb}
          onChange={(e) =>
            setFilters({ ...filters, awb: e.target.value })
          }
        />
      </div>

      {/* From Date */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">From</label>
        <input
          type="date"
          className="p-2 rounded border text-sm"
          value={filters.from}
          onChange={(e) =>
            setFilters({ ...filters, from: e.target.value })
          }
        />
      </div>

      {/* To Date */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">To</label>
        <input
          type="date"
          className="p-2 rounded border text-sm"
          value={filters.to}
          onChange={(e) =>
            setFilters({ ...filters, to: e.target.value })
          }
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 ml-auto">

        {/* Reset */}
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm rounded border bg-gray-100 hover:bg-gray-200"
        >
          Reset
        </button>

        {/* Search */}
        <button
          onClick={onSearch}
          className="px-4 py-2 text-sm rounded bg-red-500 text-white hover:bg-red-600"
        >
          Search
        </button>

      </div>
    </div>
  );
};

export default TransactionFilters;