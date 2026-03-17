import React, { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

const CODRemittance = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    orderId: "",
    email: "",
    status: "",
  });

  // -------- FETCH DATA --------
  useEffect(() => {
    const fetchCODData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:5000/api/super-admin/cod-remittance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await res.json();
        setData(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error("COD fetch error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCODData();
  }, []);

  // -------- FILTER --------
  const filteredData = data.filter((item) => {
    return (
      (!filters.orderId ||
        item.orderId.toLowerCase().includes(filters.orderId.toLowerCase())) &&
      (!filters.email ||
        item.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.status || item.status === filters.status)
    );
  });

  // -------- SUMMARY --------
  const pending = filteredData
    .filter((i) => i.status !== "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  const paid = filteredData
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  const total = pending + paid;

  // -------- SELECT --------
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selected.length === filteredData.length) {
      setSelected([]);
    } else {
      setSelected(filteredData.map((i) => i._id));
    }
  };

  // -------- MARK PAID --------
  const markBulkPaid = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        "http://localhost:5000/api/super-admin/cod-remittance/mark-paid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ids: selected }),
        }
      );

      setData((prev) =>
        prev.map((item) =>
          selected.includes(item._id)
            ? { ...item, status: "paid" }
            : item
        )
      );

      setSelected([]);
    } catch (err) {
      console.error("Mark paid error:", err);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-gray-800">
        COD Remittance Dashboard
      </h2>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          placeholder="Search Order ID"
          className="px-3 py-2 rounded border focus:ring-2 focus:ring-indigo-400"
          onChange={(e) =>
            setFilters({ ...filters, orderId: e.target.value })
          }
        />
        <input
          placeholder="Search Email"
          className="px-3 py-2 rounded border focus:ring-2 focus:ring-indigo-400"
          onChange={(e) =>
            setFilters({ ...filters, email: e.target.value })
          }
        />
        <select
          className="px-3 py-2 rounded border focus:ring-2 focus:ring-indigo-400"
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>

        <button
          onClick={() =>
            setFilters({ orderId: "", email: "", status: "" })
          }
          className="bg-gray-200 hover:bg-gray-300 rounded px-3 py-2"
        >
          Reset
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-100 p-5 rounded-xl shadow">
          <p className="text-sm text-gray-600">Pending COD</p>
          <p className="text-2xl font-bold text-yellow-700">₹ {pending}</p>
        </div>

        <div className="bg-blue-100 p-5 rounded-xl shadow">
          <p className="text-sm text-gray-600">Paid COD</p>
          <p className="text-2xl font-bold text-blue-700">₹ {paid}</p>
        </div>

        <div className="bg-green-100 p-5 rounded-xl shadow">
          <p className="text-sm text-gray-600">Total COD</p>
          <p className="text-2xl font-bold text-green-700">₹ {total}</p>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <p className="text-sm text-gray-600">
          Selected: {selected.length} | ₹{" "}
          {selected
            .map((id) => data.find((d) => d._id === id)?.amount || 0)
            .reduce((a, b) => a + b, 0)}
        </p>

        <button
          disabled={!selected.length}
          onClick={markBulkPaid}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          <CheckCircle size={16} />
          Mark as Paid
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        {loading ? (
          <div className="flex justify-center items-center p-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3">
                  <input
                    type="checkbox"
                    onChange={selectAll}
                    checked={
                      selected.length === filteredData.length &&
                      filteredData.length > 0
                    }
                  />
                </th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(item._id)}
                        onChange={() => toggleSelect(item._id)}
                      />
                    </td>

                    <td className="font-medium">{item.orderId}</td>
                    <td>{item.customerName}</td>
                    <td>{item.email}</td>
                    <td className="font-semibold">₹ {item.amount}</td>

                    <td>
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          item.status === "paid"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-400"
                  >
                    No COD data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CODRemittance;