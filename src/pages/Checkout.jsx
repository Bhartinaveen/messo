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
  const [editingId, setEditingId] = useState(null); // ✅ NEW

  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
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

  const subtotal = Number(checkoutData?.subtotal || 0);
  const gst = Number(checkoutData?.gst || 0);
  const deliveryCharge = Number(checkoutData?.deliveryCharge || 0);
  const walletUsed = checkoutData?.walletUsed || false;
  const walletDeduction = Number(checkoutData?.walletDeduction || 0);
  const finalTotal = Number(checkoutData?.finalTotal || 0);

  // ================= SAVE OR UPDATE ADDRESS =================
  const handleSaveAddress = () => {
    if (
      !newAddress.name ||
      !newAddress.phone ||
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    const user =
      JSON.parse(localStorage.getItem("user")) || { id: "guest" };

    let updated;

    if (editingId) {
      // ✅ UPDATE MODE
      updated = addresses.map((addr) =>
        addr.id === editingId ? { ...addr, ...newAddress } : addr
      );
    } else {
      // ADD MODE
      updated = [...addresses, { id: Date.now(), ...newAddress }];
    }

    localStorage.setItem(
      `addresses_${user.id}`,
      JSON.stringify(updated)
    );

    setAddresses(updated);
    setShowAddressForm(false);
    setEditingId(null);

    setNewAddress({
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: ""
    });
  };

  // ✅ EDIT FUNCTION
  const handleEdit = (address) => {
    setShowAddressForm(true);
    setEditingId(address.id);
    setNewAddress(address);
  };

  // ================= PLACE ORDER =================
  const handlePlaceOrder = () => {
    if (cart.length === 0) return alert("Cart is empty");
    if (!addressId) return alert("Please select address");

    setLoading(true);

    try {
      const user =
        JSON.parse(localStorage.getItem("user")) || { id: "guest" };

      const selectedAddress = addresses.find(
        (a) => a.id === addressId
      );

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
        address: selectedAddress,
        date: new Date().toISOString()
      };

      if (walletUsed && walletDeduction > 0) {
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

          {/* ADDRESS SECTION */}
          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3 className="text-lg font-semibold mb-4">
              Delivery Address
            </h3>

            {showAddressForm && (
              <div className="space-y-3">
                {Object.keys(newAddress).map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.toUpperCase()}
                    value={newAddress[field]}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        [field]: e.target.value
                      })
                    }
                    className="w-full border p-3 rounded-lg"
                  />
                ))}

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveAddress}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    {editingId ? "Update" : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddressForm(false);
                      setEditingId(null);
                    }}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {addresses.length > 0 && (
              <div className="space-y-3 mt-4">
                {addresses.map((a) => (
                  <div
                    key={a.id}
                    className={`border p-4 rounded-xl ${
                      addressId === a.id
                        ? "border-orange-500 bg-orange-50"
                        : ""
                    }`}
                  >
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        checked={addressId === a.id}
                        onChange={() => setAddressId(a.id)}
                        className="mr-2"
                      />
                      <div className="font-medium">{a.name}</div>
                      <div className="text-sm text-gray-600">
                        {a.street}, {a.city}, {a.state} - {a.pincode}
                      </div>
                      <div className="text-sm text-gray-500">
                        {a.phone}
                      </div>
                    </label>

                    {/* ✅ EDIT BUTTON */}
                    <button
                      onClick={() => handleEdit(a)}
                      className="text-blue-600 text-sm mt-2 underline"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PAYMENT METHOD (UNCHANGED) */}
          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3 className="text-lg font-semibold mb-4">
              Payment Method
            </h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit / Debit Card
              </label>

              <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash On Delivery
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SUMMARY (UNCHANGED) */}
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
              <span>GST</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>
                {deliveryCharge === 0
                  ? "FREE"
                  : `₹${deliveryCharge.toFixed(2)}`}
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