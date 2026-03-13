import React, { useState, useEffect } from "react";

const MyWallet = ({ user }) => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const MAX_LIMIT = 100000;

  useEffect(() => {
    const storedWallet = localStorage.getItem("walletBalance");
    const storedTransactions = localStorage.getItem("walletTransactions");

    if (storedWallet) setBalance(Number(storedWallet));
    if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
  }, []);

  useEffect(() => {
    localStorage.setItem("walletBalance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("walletTransactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAddMoney = () => {
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      alert("Enter valid amount");
      return;
    }

    if (balance + numericAmount > MAX_LIMIT) {
      alert("Wallet balance cannot exceed ₹100000");
      return;
    }

    const newBalance = balance + numericAmount;
    setBalance(newBalance);

    const newTransaction = {
      id: Date.now(),
      type: "credit",
      amount: numericAmount,
      description: "Wallet Top-up",
      date: new Date().toLocaleString(),
    };

    setTransactions([newTransaction, ...transactions]);
    setAmount("");
  };

  const quickAdd = (value) => {
    setAmount(value);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* WALLET CARD */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold">My Wallet</h2>

          <p className="text-sm opacity-80 mt-1">Available Balance</p>

          <h1 className="text-4xl sm:text-5xl font-extrabold mt-2">
            ₹ {balance.toFixed(2)}
          </h1>

          <p className="text-xs mt-2 opacity-80">
            Max wallet limit ₹{MAX_LIMIT.toLocaleString()}
          </p>
        </div>

        {/* ADD MONEY */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Add Money</h3>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              max={MAX_LIMIT}
              onChange={(e) => setAmount(e.target.value)}
              className="border px-4 py-2 rounded-lg flex-1 focus:ring-2 focus:ring-orange-400 outline-none"
            />

            <button
              onClick={handleAddMoney}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium"
            >
              Add Money
            </button>
          </div>

          {/* QUICK AMOUNT */}
          <div className="flex flex-wrap gap-3 mt-4">
            {[500, 1000, 2000, 5000].map((val) => (
              <button
                key={val}
                onClick={() => quickAdd(val)}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100"
              >
                ₹{val}
              </button>
            ))}
          </div>
        </div>

        {/* TRANSACTION HISTORY */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Transaction History
          </h3>

          {transactions.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>No transactions yet</p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-medium text-sm sm:text-base">
                      {tx.description}
                    </p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>

                  <p
                    className={`font-semibold text-sm sm:text-base ${
                      tx.type === "credit"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {tx.type === "credit" ? "+" : "-"} ₹
                    {tx.amount.toFixed(2)}
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