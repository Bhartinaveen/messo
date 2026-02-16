import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } =
    useCart();

  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(0);
  const [useWallet, setUseWallet] = useState(false);

  useEffect(() => {
    const storedWallet = localStorage.getItem("walletBalance");
    if (storedWallet) setWalletBalance(Number(storedWallet));
  }, []);

  // ================= CALCULATIONS =================

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.18;
  const deliveryCharge = subtotal > 0 && subtotal < 500 ? 50 : 0;
  const originalTotal = subtotal + gst + deliveryCharge;

  const walletDeduction = useWallet
    ? Math.min(walletBalance, originalTotal)
    : 0;

  const finalTotal = originalTotal - walletDeduction;

  const savings = walletDeduction;

  const handleCheckout = () => {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const checkoutData = {
    subtotal,
    gst,
    deliveryCharge,
    walletUsed: useWallet,
    walletDeduction,
    finalTotal
  };

  localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

  navigate("/checkout");
};


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Your cart is empty 🛒</h2>
          <button
            onClick={() => navigate("/")}
            className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ================= CART ITEMS ================= */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow flex gap-5"
              >
                <img
                  src={item.image || "/image/logo.png"}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {item.name}
                  </h2>

                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-xl font-bold text-gray-800">
                      ₹ {item.price}
                    </span>

                    <span className="text-sm text-gray-400 line-through">
                      ₹ {(item.price * 1.2).toFixed(0)}
                    </span>

                    <span className="text-green-600 text-sm font-medium">
                      20% OFF
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-semibold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* ================= ORDER SUMMARY ================= */}
          <div className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-6">

            <h2 className="text-xl font-semibold mb-5 border-b pb-3">
              Price Details
            </h2>

            <div className="space-y-3 text-gray-700">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹ {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹ {gst.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span className={deliveryCharge === 0 ? "text-green-600" : ""}>
                  {deliveryCharge === 0
                    ? "FREE"
                    : `₹ ${deliveryCharge}`}
                </span>
              </div>

              {/* Wallet */}
              <div className="border-t pt-3 mt-3">

                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useWallet}
                      onChange={() => setUseWallet(!useWallet)}
                    />
                    Use Wallet
                  </label>

                  <span className="text-sm text-gray-500">
                    ₹ {walletBalance.toFixed(2)}
                  </span>
                </div>

                {useWallet && (
                  <div className="flex justify-between text-green-600 mt-2">
                    <span>Wallet Discount</span>
                    <span>- ₹ {walletDeduction.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <hr />

              {savings > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>You Saved</span>
                  <span>₹ {savings.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between font-bold text-xl">
                <span>Total Payable</span>
                <span>₹ {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold"
            >
              Place Order
            </button>

            {deliveryCharge === 0 && subtotal > 0 && (
              <p className="text-green-600 text-sm mt-3 text-center">
                🎉 You got FREE Delivery!
              </p>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
