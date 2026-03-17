import React, { useEffect, useState } from "react";
import TransactionFilters from "./TransactionFilters";
import TransactionTable from "./TransactionTable";
import { getTransactions } from "../services/transactionService";

const TransactionHistory = ({ role }) => {
  const [filters, setFilters] = useState({
    type: "",
    orderId: "",
    awb: "",
    from: "",
    to: "",
    page: 1,
  });

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const res = await getTransactions({
        ...filters,
        role,
      });

      setData(res.transactions || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error("Transaction fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters.page]);

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-bold">
          Transaction History
        </h1>

        {/* Optional Export Button */}
        <button
          className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 text-sm"
          onClick={() => alert("Export coming soon")}
        >
          Download
        </button>
      </div>

      {/* Filters */}
      <TransactionFilters
        filters={filters}
        setFilters={setFilters}
        onSearch={fetchTransactions}
      />

      {/* Table / Loading */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading transactions...
        </div>
      ) : (
        <TransactionTable data={data} />
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3">

        <button
          disabled={filters.page === 1}
          onClick={() =>
            setFilters({ ...filters, page: filters.page - 1 })
          }
          className={`px-3 py-1 rounded border text-sm ${
            filters.page === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Prev
        </button>

        <span className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
          Page {filters.page}
        </span>

        <button
          disabled={filters.page === totalPages}
          onClick={() =>
            setFilters({ ...filters, page: filters.page + 1 })
          }
          className={`px-3 py-1 rounded border text-sm ${
            filters.page === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default TransactionHistory;