import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [addressId, setAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [checkoutData, setCheckoutData] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    phone: ""
  });

  // ================= LOAD DATA =================
  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("user")) || { id: "guest" };

    const storedWallet = localStorage.getItem("walletBalance");
    if (storedWallet) setWalletBalance(Number(storedWallet));

    const storedCheckout = localStorage.getItem("checkoutData");
    if (storedCheckout) setCheckoutData(JSON.parse(storedCheckout));

    const storedAddresses = JSON.parse(
      localStorage.getItem(`addresses_${user.id}`) || "[]"
    );

    setAddresses(storedAddresses);

    if (storedAddresses.length > 0) {
      setAddressId(storedAddresses[0].id);
    }
  }, []);

  if (!checkoutData) {
    return <div className="p-6">No checkout data found.</div>;
  }

  const {
    subtotal,
    gst,
    deliveryCharge,
    walletUsed,
    walletDeduction,
    finalTotal
  } = checkoutData;

  // ================= ADD ADDRESS =================
  const handleSaveAddress = () => {
    if (!newAddress.name || !newAddress.address || !newAddress.phone) {
      alert("Please fill all fields");
      return;
    }

    const user =
      JSON.parse(localStorage.getItem("user")) || { id: "guest" };

    const updated = [
      ...addresses,
      { id: Date.now(), ...newAddress }
    ];

    localStorage.setItem(
      `addresses_${user.id}`,
      JSON.stringify(updated)
    );

    setAddresses(updated);
    setAddressId(updated[updated.length - 1].id);
    setShowAddressForm(false);
    setNewAddress({ name: "", address: "", phone: "" });
  };

  // ================= PLACE ORDER =================
  const handlePlaceOrder = () => {
    if (cart.length === 0) return alert("Cart is empty");
    if (!addressId) return alert("Please add address");

    setLoading(true);

    try {
      const user =
        JSON.parse(localStorage.getItem("user")) || { id: "guest" };

      const order = {
        id: Date.now(),
        userId: user.id,
        status: "Processing",
        items: cart,
        subtotal,
        gst,
        deliveryCharge,
        walletUsed,
        walletDeduction,
        amount: finalTotal,
        paymentMethod,
        address: addresses.find((a) => a.id === addressId),
        date: new Date().toISOString()
      };

      if (walletUsed) {
        const newWallet = walletBalance - walletDeduction;
        localStorage.setItem("walletBalance", newWallet);
      }

      const savedOrders = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );
      savedOrders.unshift(order);
      localStorage.setItem("orders", JSON.stringify(savedOrders));

      clearCart();
      localStorage.removeItem("checkoutData");

      alert("Order placed successfully!");
      navigate("/my-orders");
    } catch (err) {
      console.error(err);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">

          <h1 className="text-3xl font-bold">Checkout</h1>

          {/* ADDRESS */}
          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3 className="text-lg font-semibold mb-4">
              Delivery Address
            </h3>

            {addresses.length === 0 && !showAddressForm && (
              <div className="space-y-3">
                <p className="text-gray-500">
                  No address found.
                </p>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg"
                >
                  + Add Address
                </button>
              </div>
            )}

            {showAddressForm && (
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      name: e.target.value
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />

                <textarea
                  placeholder="Full Address"
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      address: e.target.value
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={newAddress.phone}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      phone: e.target.value
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveAddress}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowAddressForm(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {addresses.length > 0 && (
              <div className="space-y-3">
                {addresses.map((a) => (
                  <label
                    key={a.id}
                    className={`block border p-4 rounded-xl cursor-pointer ${
                      addressId === a.id
                        ? "border-orange-500 bg-orange-50"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      checked={addressId === a.id}
                      onChange={() => setAddressId(a.id)}
                      className="mr-2"
                    />
                    <span className="font-medium">
                      {a.name}
                    </span>
                    <div className="text-sm text-gray-600">
                      {a.address}
                    </div>
                    <div className="text-sm text-gray-500">
                      {a.phone}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* PAYMENT */}
          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3 className="text-lg font-semibold mb-4">
              Payment Method
            </h3>

            <div className="grid sm:grid-cols-3 gap-4">
              {["card", "upi", "cod"].map((method) => (
                <label
                  key={method}
                  className={`border p-4 rounded-xl text-center cursor-pointer ${
                    paymentMethod === method
                      ? "border-orange-500 bg-orange-50"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    className="hidden"
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                  <div className="font-semibold uppercase">
                    {method}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border h-fit sticky top-10">

          <h3 className="text-xl font-semibold mb-6">
            Order Summary
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>
                {deliveryCharge === 0
                  ? "FREE"
                  : `₹${deliveryCharge}`}
              </span>
            </div>

            {walletUsed && (
              <div className="flex justify-between text-green-600">
                <span>Wallet Used</span>
                <span>- ₹{walletDeduction.toFixed(2)}</span>
              </div>
            )}

            <hr />

            <div className="flex justify-between font-bold text-xl">
              <span>Total Payable</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-6 w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-lg font-semibold"
          >
            {loading ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
