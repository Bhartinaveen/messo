import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  DollarSign,
  ArrowDownCircle,
  ArrowUpCircle,
  X,
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Wallet = () => {
  const { token } = useAuth();

  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(500);
  const [loading, setLoading] = useState(false);

  const headers = { Authorization: `Bearer ${token}` };

  // -------- FETCH WALLET --------
  const fetchWallet = async () => {
    try {
      const res = await fetch(`${BASE_URL}/super-admin/wallet`, {
        headers,
      });
      if (res.ok) {
        const data = await res.json();
        setWallet(data.wallet);
        setTransactions(data.transactions || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [token]);

  // -------- HANDLE RECHARGE --------
  const handleRecharge = async () => {
    if (!amount || amount <= 0) return alert("Enter valid amount");

    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/super-admin/wallet/recharge`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Wallet recharged successfully ✅");
        setShowModal(false);
        setAmount(500);
        fetchWallet();
      } else {
        alert(data.message || "Recharge failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-3 md:p-6">

      {/* -------- BALANCE CARD -------- */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg">Total Wallet Balance</h2>
          <p className="text-3xl font-bold mt-2">
            ₹{wallet?.balance ?? 0}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-green-600 px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
        >
          + Recharge
        </button>
      </div>

      {/* -------- SUMMARY -------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Credit</p>
            <p className="text-xl font-semibold text-green-600">
              ₹{wallet?.totalCredit ?? 0}
            </p>
          </div>
          <ArrowDownCircle className="text-green-500" />
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Debit</p>
            <p className="text-xl font-semibold text-red-600">
              ₹{wallet?.totalDebit ?? 0}
            </p>
          </div>
          <ArrowUpCircle className="text-red-500" />
        </div>
      </div>

      {/* -------- TRANSACTIONS -------- */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <DollarSign size={18} />
          Transactions
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-2">Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr key={tx._id} className="border-b">
                    <td className="py-2">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                    <td className="capitalize">{tx.type}</td>
                    <td
                      className={
                        tx.type === "credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      ₹{tx.amount}
                    </td>
                    <td>{tx.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 text-gray-400"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* -------- MODAL -------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-xl">

            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-center mb-5">
              Wallet Recharge
            </h2>

            {/* Input */}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter amount"
            />

            {/* Quick Buttons */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[500, 1000, 2000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`py-2 rounded-lg border font-medium transition ${
                    amount === amt
                      ? "bg-green-500 text-white border-green-500"
                      : "hover:bg-gray-100"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            {/* Recharge Button */}
            <button
              onClick={handleRecharge}
              disabled={loading}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              {loading ? "Processing..." : `Recharge ₹${amount}`}
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;