import React, { useState, useEffect } from "react";

const MyWallet = ({ user }) => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const MAX_LIMIT = 100000;

  // Load wallet from localStorage
  useEffect(() => {
    const storedWallet = localStorage.getItem("walletBalance");
    const storedTransactions = localStorage.getItem("walletTransactions");

    if (storedWallet) {
      setBalance(Number(storedWallet));
    }

    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  // Save wallet whenever balance changes
  useEffect(() => {
    localStorage.setItem("walletBalance", balance);
  }, [balance]);

  // Save transactions
  useEffect(() => {
    localStorage.setItem("walletTransactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAddMoney = () => {
    if (!amount || amount <= 0) return;

     const numericAmount = Number(amount);

    // ❌ Check if new balance exceeds 100000
    if (balance + numericAmount > MAX_LIMIT) {
      alert("Wallet balance cannot exceed ₹100000");
      return;
    }

    const newBalance = balance + Number(amount);
    setBalance(newBalance);

    const newTransaction = {
      id: Date.now(),
      type: "credit",
      amount: Number(amount),
      description: "Wallet Top-up",
      date: new Date().toLocaleString(),
    };

    setTransactions([newTransaction, ...transactions]);
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Wallet Card */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">My Wallet</h2>
          <p className="text-sm sm:text-base">Available Balance</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-2">
            ₹ {balance.toFixed(2)}
          </h1>
          <p className="text-xs mt-2 opacity-80">
            Maximum allowed balance: ₹ {MAX_LIMIT}
          </p>
        </div>

        {/* Add Money Section */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md mb-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">
            Add Money
          </h3>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              max={MAX_LIMIT}
              onChange={(e) => setAmount(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full sm:w-auto flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              onClick={handleAddMoney}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg w-full sm:w-auto"
            >
              Add Money
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">
            Transaction History
          </h3>

          {transactions.length === 0 ? (
            <p className="text-gray-500 text-sm">No transactions yet.</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium text-sm sm:text-base">
                      {tx.description}
                    </p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>

                  <p className="text-green-600 font-semibold text-sm sm:text-base">
                    + ₹ {tx.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MyWallet;
