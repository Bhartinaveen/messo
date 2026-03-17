import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedAddressId, setSelectedAddressId] = useState(null); // Renamed addressId to selectedAddressId for clarity
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [checkoutData, setCheckoutData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(''); // Added error state for feedback
  const [message, setMessage] = useState(''); // Added message state for feedback

  const [newAddress, setNewAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    addressType: "Home",
    isDefault: false,
  });

  const token = localStorage.getItem('token');

  // ================= LOAD DATA =================
  useEffect(() => {
    // Load checkout data (subtotal, GST etc.)
    const storedCheckout = localStorage.getItem("checkoutData");
    if (storedCheckout) setCheckoutData(JSON.parse(storedCheckout));

    // Load wallet balance
    const storedWallet = localStorage.getItem("walletBalance");
    if (storedWallet) setWalletBalance(Number(storedWallet));

    // Fetch addresses from backend
    const fetchAddresses = async () => {
      setLoading(true);
      setError('');
      try {
        if (!token) {
          navigate('/login');
          return;
        }
        const res = await fetch(`${BASE_URL}/addresses`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch addresses');
        }
        setAddresses(data);
        if (data.length > 0) {
          const defaultAddr = data.find(addr => addr.isDefault);
          setSelectedAddressId(defaultAddr ? defaultAddr.id : data[0].id);
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setError(err.message || "Failed to load addresses.");
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, [navigate, token]); // Include token in dependencies for useEffect

  if (!checkoutData) {
    return <div className="p-6 text-red-600">No checkout data found. Please go to cart first.</div>;
  }

  const subtotal = Number(checkoutData?.subtotal || 0);
  const gst = Number(checkoutData?.gst || 0);
  const deliveryCharge = Number(checkoutData?.deliveryCharge || 0);
  const walletUsed = checkoutData?.walletUsed || false;
  const walletDeduction = Number(checkoutData?.walletDeduction || 0);
  const finalTotal = Number(checkoutData?.finalTotal || 0);

  // ================= ADDRESS FORM HANDLERS =================
  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveAddress = async () => {
    const { addressLine1, city, state, postalCode } = newAddress;
    if (!addressLine1 || !city || !state || !postalCode) {
      setError("Please fill in all required address fields.");
      return;
    }
    setLoading(true);
    setError('');

    try {
      let res;
      let data;
      if (editingId) {
        res = await fetch(`${BASE_URL}/addresses/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(newAddress)
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to update address');
        setMessage('Address updated successfully!');
      } else {
        res = await fetch(`${BASE_URL}/addresses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(newAddress)
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to add address');
        setMessage('Address added successfully!');
      }
      // Re-fetch addresses to update the list and select the new/updated one
      const updatedAddressesRes = await fetch(`${BASE_URL}/addresses`, { headers: { 'Authorization': `Bearer ${token}` } });
      const updatedAddressesData = await updatedAddressesRes.json();
      setAddresses(updatedAddressesData);
      if (editingId) { // If editing, keep selected
        setSelectedAddressId(editingId);
      } else { // If adding, select the new address (or default if it was set)
        const defaultAddr = updatedAddressesData.find(addr => addr.isDefault);
        setSelectedAddressId(defaultAddr ? defaultAddr.id : data.id); // Assuming data.id is the new address's ID
      }
      
      setShowAddressForm(false);
      setEditingId(null);
      setNewAddress({ addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "India", addressType: "Home", isDefault: false });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error("Error saving address:", err);
      setError(err.message || "Failed to save address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setShowAddressForm(true);
    setEditingId(address.id);
    setNewAddress(address);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/addresses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete address');
      setMessage('Address deleted successfully!');
      // Re-fetch addresses and update selection
      const updatedAddressesRes = await fetch(`${BASE_URL}/addresses`, { headers: { 'Authorization': `Bearer ${token}` } });
      const updatedAddressesData = await updatedAddressesRes.json();
      setAddresses(updatedAddressesData);
      if (selectedAddressId === id) {
        setSelectedAddressId(updatedAddressesData.length > 0 ? updatedAddressesData[0].id : null);
      }
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error("Error deleting address:", err);
      setError(err.message || "Failed to delete address.");
    } finally {
      setLoading(false);
    }
  };

  // ================= PLACE ORDER =================
  const handlePlaceOrder = () => {
    if (cart.length === 0) return alert("Cart is empty");
    if (!selectedAddressId) return alert("Please select a delivery address.");

    setLoading(true);

    try {
      const user =
        JSON.parse(localStorage.getItem("user")) || { id: "guest" };

      const selectedAddress = addresses.find(
        (a) => a.id === selectedAddressId
      );

      const order = {
        id: Date.now(),
        userId: user.id,
        status: "Processing",
        items: cart.map(item => ({...item, qty: item.quantity})), // Ensure quantity is sent as qty
        subtotal,
        gst,
        deliveryCharge,
        walletUsed,
        walletDeduction,
        totalPrice: finalTotal, // Use totalPrice to match backend Order model
        paymentMethod,
        address: selectedAddress,
        date: new Date().toISOString(),
        isPaid: paymentMethod === 'card' // Assuming card payments are considered paid immediately
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">Checkout</h1>

          {message && <div className="p-3 bg-green-100 text-green-700 rounded-lg">{message}</div>}
          {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

          {/* ADDRESS SECTION */}
          <div className="bg-white p-6 rounded-2xl shadow border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Delivery Address</h3>
              {!showAddressForm && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setNewAddress({ addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "India", addressType: "Home", isDefault: false });
                    setShowAddressForm(true);
                  }}
                  className="text-orange-600 font-medium hover:underline"
                >
                  + Add New
                </button>
              )}
            </div>

            {showAddressForm && (
              <div className="space-y-3">
                <input
                  name="addressLine1"
                  value={newAddress.addressLine1}
                  onChange={handleAddressChange}
                  placeholder="House No, Building, Street *"
                  className="w-full border p-3 rounded-lg"
                  required
                />
                <input
                  name="addressLine2"
                  value={newAddress.addressLine2}
                  onChange={handleAddressChange}
                  placeholder="Area, Landmark (Optional)"
                  className="w-full border p-3 rounded-lg"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="city"
                    value={newAddress.city}
                    onChange={handleAddressChange}
                    placeholder="City *"
                    className="border p-3 rounded-lg"
                    required
                  />
                  <input
                    name="state"
                    value={newAddress.state}
                    onChange={handleAddressChange}
                    placeholder="State *"
                    className="border p-3 rounded-lg"
                    required
                  />
                </div>
                <input
                  name="postalCode"
                  value={newAddress.postalCode}
                  onChange={handleAddressChange}
                  placeholder="Pincode *"
                  maxLength={6}
                  className="w-full border p-3 rounded-lg"
                  required
                />
                <input
                  name="country"
                  value={newAddress.country}
                  onChange={handleAddressChange}
                  placeholder="Country"
                  className="w-full border p-3 rounded-lg"
                />
                <select
                  name="addressType"
                  value={newAddress.addressType}
                  onChange={handleAddressChange}
                  className="w-full border p-3 rounded-lg bg-white"
                >
                  <option value="Home">🏠 Home</option>
                  <option value="Office">🏢 Office</option>
                  <option value="Other">📍 Other</option>
                </select>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={newAddress.isDefault}
                    onChange={handleAddressChange}
                    className="accent-orange-500"
                  />
                  Set as Default Address
                </label>

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveAddress}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    {loading ? "Saving..." : editingId ? "Update" : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddressForm(false);
                      setEditingId(null);
                      setNewAddress({ addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "India", isDefault: false });
                    }}
                    disabled={loading}
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
                      selectedAddressId === a.id
                        ? "border-orange-500 bg-orange-50"
                        : ""
                    }`}
                  >
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        checked={selectedAddressId === a.id}
                        onChange={() => setSelectedAddressId(a.id)}
                        className="mr-2"
                      />
                      <div className="font-semibold text-gray-800">
                        {a.addressLine1}

                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {a.addressType || "Home"}
                          </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {a.addressLine1}, {a.addressLine2 && `${a.addressLine2}, `}{a.city}, {a.state} - {a.postalCode}
                      </div>
                      <div className="text-sm text-gray-500">
                        {a.country}
                      </div>
                    </label>

                    <div className="mt-2 flex gap-4">
                      <button
                        onClick={() => handleEdit(a)}
                        className="text-blue-600 text-sm underline hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="text-red-600 text-sm underline hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
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

            <label className={`flex items-center gap-3 border p-4 rounded-lg cursor-pointer 
            ${paymentMethod==="card" ? "border-orange-500 bg-orange-50" : ""}`}>

            <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e)=>setPaymentMethod(e.target.value)}
            />

            <div>
            <p className="font-medium">Credit / Debit Card</p>
            <p className="text-xs text-gray-500">Visa, MasterCard, RuPay</p>
            </div>

            </label>

            <label className={`flex items-center gap-3 border p-4 rounded-lg cursor-pointer 
            ${paymentMethod==="cod" ? "border-orange-500 bg-orange-50" : ""}`}>

            <input
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e)=>setPaymentMethod(e.target.value)}
            />

            <div>
            <p className="font-medium">Cash On Delivery</p>
            <p className="text-xs text-gray-500">Pay when product arrives</p>
            </div>

            </label>

            </div>
          </div>
        </div>

      {/* RIGHT COLUMN */}
        <div className="space-y-6">

          {/* CART ITEMS */}
          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3 className="text-lg font-semibold mb-4">
              Your Items ({cart.length})
            </h3>

            <div className="space-y-4 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4">

                  <img
                    src={item.image || "/image/logo.png"}
                    className="w-14 h-14 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="font-semibold text-sm">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* COUPON */}
          <div className="bg-white p-4 rounded-xl border">
            <input
              placeholder="Enter Coupon Code"
              className="border p-2 rounded-lg w-full"
            />
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border sticky top-20">

            <h3 className="text-xl font-semibold mb-4">
              Order Summary
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              {cart.length} items in your cart
            </p>

            <div className="space-y-3 text-gray-700">

              <div className="flex justify-between">
                <span>Items Price</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span className={deliveryCharge === 0 ? "text-green-600 font-medium" : ""}>
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge.toFixed(2)}`}
                </span>
              </div>

              {walletUsed && (
                <div className="flex justify-between text-green-600">
                  <span>Wallet Discount</span>
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
              className="mt-6 w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-lg font-semibold hover:scale-[1.02] transition"
            >
              {loading ? "Processing..." : "Confirm Order"}
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              🔒 Secure Checkout
            </p>

          </div>

        </div>
        </div>
    </div>
  );
};

export default Checkout;

// frontend/src/pages/Checkout.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const Checkout = () => {
//   const { cart, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [selectedAddressId, setSelectedAddressId] = useState(null); 
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [loading, setLoading] = useState(false);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [checkoutData, setCheckoutData] = useState(null);
//   const [addresses, setAddresses] = useState([]);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [error, setError] = useState(''); 
//   const [message, setMessage] = useState(''); 

//   const [newAddress, setNewAddress] = useState({
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "India",
//     addressType: "Home",
//     isDefault: false,
//   });

//   const token = localStorage.getItem('token');

//   // ================= LOAD DATA =================
//   useEffect(() => {
//     // Load checkout data (subtotal, GST etc.)
//     const storedCheckout = localStorage.getItem("checkoutData");
//     if (storedCheckout) setCheckoutData(JSON.parse(storedCheckout));

//     // Load wallet balance
//     const storedWallet = localStorage.getItem("walletBalance");
//     if (storedWallet) setWalletBalance(Number(storedWallet));

//     // Fetch addresses from backend
//     const fetchAddresses = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         if (!token) {
//           navigate('/login');
//           return;
//         }
//         const res = await fetch(`${BASE_URL}/addresses`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const data = await res.json();
//         if (!res.ok) {
//           throw new Error(data.message || 'Failed to fetch addresses');
//         }
//         setAddresses(data);
//         if (data.length > 0) {
//           const defaultAddr = data.find(addr => addr.isDefault);
//           setSelectedAddressId(defaultAddr ? defaultAddr.id : data[0].id);
//         }
//       } catch (err) {
//         console.error("Error fetching addresses:", err);
//         setError(err.message || "Failed to load addresses.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAddresses();
//   }, [navigate, token]); 

//   if (!checkoutData) {
//     return <div className="p-6 text-red-600">No checkout data found. Please go to cart first.</div>;
//   }

//   const subtotal = Number(checkoutData?.subtotal || 0);
//   const gst = Number(checkoutData?.gst || 0);
//   const deliveryCharge = Number(checkoutData?.deliveryCharge || 0);
//   const walletUsed = checkoutData?.walletUsed || false;
//   const walletDeduction = Number(checkoutData?.walletDeduction || 0);
//   const finalTotal = Number(checkoutData?.finalTotal || 0);

//   // ================= ADDRESS FORM HANDLERS =================
//   const handleAddressChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewAddress({
//       ...newAddress,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const handleSaveAddress = async () => {
//     const { addressLine1, city, state, postalCode } = newAddress;
//     if (!addressLine1 || !city || !state || !postalCode) {
//       setError("Please fill in all required address fields.");
//       return;
//     }
//     setLoading(true);
//     setError('');

//     try {
//       let res;
//       let data;
//       if (editingId) {
//         res = await fetch(`${BASE_URL}/addresses/${editingId}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//           body: JSON.stringify(newAddress)
//         });
//         data = await res.json();
//         if (!res.ok) throw new Error(data.message || 'Failed to update address');
//         setMessage('Address updated successfully!');
//       } else {
//         res = await fetch(`${BASE_URL}/addresses`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//           body: JSON.stringify(newAddress)
//         });
//         data = await res.json();
//         if (!res.ok) throw new Error(data.message || 'Failed to add address');
//         setMessage('Address added successfully!');
//       }
      
//       const updatedAddressesRes = await fetch(`${BASE_URL}/addresses`, { headers: { 'Authorization': `Bearer ${token}` } });
//       const updatedAddressesData = await updatedAddressesRes.json();
//       setAddresses(updatedAddressesData);
//       if (editingId) { 
//         setSelectedAddressId(editingId);
//       } else { 
//         const defaultAddr = updatedAddressesData.find(addr => addr.isDefault);
//         setSelectedAddressId(defaultAddr ? defaultAddr.id : data.id); 
//       }
      
//       setShowAddressForm(false);
//       setEditingId(null);
//       setNewAddress({ addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "India", addressType: "Home", isDefault: false });
//       setTimeout(() => setMessage(''), 3000);
//     } catch (err) {
//       console.error("Error saving address:", err);
//       setError(err.message || "Failed to save address. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (address) => {
//     setShowAddressForm(true);
//     setEditingId(address.id);
//     setNewAddress(address);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this address?")) return;
//     setLoading(true);
//     setError('');
//     try {
//       const res = await fetch(`${BASE_URL}/addresses/${id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || 'Failed to delete address');
//       setMessage('Address deleted successfully!');
      
//       const updatedAddressesRes = await fetch(`${BASE_URL}/addresses`, { headers: { 'Authorization': `Bearer ${token}` } });
//       const updatedAddressesData = await updatedAddressesRes.json();
//       setAddresses(updatedAddressesData);
//       if (selectedAddressId === id) {
//         setSelectedAddressId(updatedAddressesData.length > 0 ? updatedAddressesData[0].id : null);
//       }
//       setTimeout(() => setMessage(''), 3000);
//     } catch (err) {
//       console.error("Error deleting address:", err);
//       setError(err.message || "Failed to delete address.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= PLACE ORDER =================
//   const handlePlaceOrder = async () => { // Made async
//     if (cart.length === 0) return alert("Cart is empty");
//     if (!selectedAddressId) return alert("Please select a delivery address.");
//     if (!paymentMethod) return alert("Please select a payment method.");

//     setLoading(true);
//     setError('');

//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user) {
//         throw new Error("User not logged in.");
//       }

//       const selectedAddress = addresses.find(a => a.id === selectedAddressId);
//       if (!selectedAddress) {
//         throw new Error("Selected address not found.");
//       }

//       // Prepare items for the backend, only sending product ID and quantity
//       const orderItems = cart.map(item => ({
//         id: item.id, // This `id` maps to `productId` in backend
//         quantity: item.quantity
//       }));

//       const orderPayload = {
//         userId: user.id,
//         items: orderItems,
//         paymentMethod: paymentMethod,
//         address: selectedAddress, // Send the full address object
//       };

//       const response = await fetch(`${BASE_URL}/orders`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(orderPayload),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to place order.");
//       }

//       // If successful, update wallet balance (simulated for now)
//       if (walletUsed && walletDeduction > 0) {
//         const newWallet = walletBalance - walletDeduction;
//         localStorage.setItem("walletBalance", newWallet);
//       }

//       clearCart();
//       localStorage.removeItem("checkoutData");

//       alert("Order placed successfully!");
//       navigate("/my-orders");

//     } catch (err) {
//       console.error("Error placing order:", err);
//       setError(err.message || "Order failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

//         {/* LEFT SECTION */}
//         <div className="lg:col-span-2 space-y-6">
//           <h1 className="text-3xl font-bold">Checkout</h1>

//           {message && <div className="p-3 bg-green-100 text-green-700 rounded-lg">{message}</div>}
//           {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

//           {/* ADDRESS SECTION */}
//           <div className="bg-white p-6 rounded-2xl shadow border">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Delivery Address</h3>
//               {!showAddressForm && (
//                 <button
//                   onClick={() => {
//                     setEditingId(null);
//                     setNewAddress({ addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "India", addressType: "Home", isDefault: false });
//                     setShowAddressForm(true);
//                   }}
//                   className="text-orange-600 font-medium hover:underline"
//                 >
//                   + Add New
//                 </button>
//               )}
//             </div>

//             {showAddressForm && (
//               <div className="space-y-3">
//                 <input
//                   name="addressLine1"
//                   value={newAddress.addressLine1}
//                   onChange={handleAddressChange}
//                   placeholder="House No, Building, Street *"
//                   className="w-full border p-3 rounded-lg"
//                   required
//                 />
//                 <input
//                   name="addressLine2"
//                   value={newAddress.addressLine2}
//                   onChange={handleAddressChange}
//                   placeholder="Area, Landmark (Optional)"
//                   className="w-full border p-3 rounded-lg"
//                 />
//                 <div className="grid grid-cols-2 gap-3">
//                   <input
//                     name="city"
//                     value={newAddress.city}
//                     onChange={handleAddressChange}
//                     placeholder="City *"
//                     className="border p-3 rounded-lg"
//                     required
//                   />
//                   <input
//                     name="state"
//                     value={newAddress.state}
//                     onChange={handleAddressChange}
//                     placeholder="State *"
//                     className="border p-3 rounded-lg"
//                     required
//                   />
//                 </div>
//                 <input
//                   name="postalCode"
//                   value={newAddress.postalCode}
//                   onChange={handleAddressChange}
//                   placeholder="Pincode *"
//                   maxLength={6}
//                   className="w-full border p-3 rounded-lg"
//                   required
//                 />
//                 <input
//                   name="country"
//                   value={newAddress.country}
//                   onChange={handleAddressChange}
//                   placeholder="Country"
//                   className="w-full border p-3 rounded-lg"
//                 />
//                 <select
//                   name="addressType"
//                   value={newAddress.addressType}
//                   onChange={handleAddressChange}
//                   className="w-full border p-3 rounded-lg bg-white"
//                 >
//                   <option value="Home">🏠 Home</option>
//                   <option value="Office">🏢 Office</option>
//                   <option value="Other">📍 Other</option>
//                 </select>

//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     name="isDefault"
//                     checked={newAddress.isDefault}
//                     onChange={handleAddressChange}
//                     className="accent-orange-500"
//                   />
//                   Set as Default Address
//                 </label>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={handleSaveAddress}
//                     disabled={loading}
//                     className="px-4 py-2 bg-green-600 text-white rounded-lg"
//                   >
//                     {loading ? "Saving..." : editingId ? "Update" : "Save"}
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowAddressForm(false);
//                       setEditingId(null);
//                       setNewAddress({ addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "India", isDefault: false });
//                     }}
//                     disabled={loading}
//                     className="px-4 py-2 bg-gray-400 text-white rounded-lg"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}

//             {addresses.length > 0 && (
//               <div className="space-y-3 mt-4">
//                 {addresses.map((a) => (
//                   <div
//                     key={a.id}
//                     className={`border p-4 rounded-xl ${
//                       selectedAddressId === a.id
//                         ? "border-orange-500 bg-orange-50"
//                         : ""
//                     }`}
//                   >
//                     <label className="cursor-pointer">
//                       <input
//                         type="radio"
//                         checked={selectedAddressId === a.id}
//                         onChange={() => setSelectedAddressId(a.id)}
//                         className="mr-2"
//                       />
//                       <div className="font-semibold text-gray-800">
//                         {a.addressLine1}

//                           <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
//                             {a.addressType || "Home"}
//                           </span>
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         {a.addressLine1}, {a.addressLine2 && `${a.addressLine2}, `}{a.city}, {a.state} - {a.postalCode}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {a.country}
//                       </div>
//                     </label>

//                     <div className="mt-2 flex gap-4">
//                       <button
//                         onClick={() => handleEdit(a)}
//                         className="text-blue-600 text-sm underline hover:text-blue-800"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(a.id)}
//                         className="text-red-600 text-sm underline hover:text-red-800"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* PAYMENT METHOD (UNCHANGED) */}
//           <div className="bg-white p-6 rounded-2xl shadow border">
//             <h3 className="text-lg font-semibold mb-4">
//               Payment Method
//             </h3>

//             <div className="space-y-3">

//             <label className={`flex items-center gap-3 border p-4 rounded-lg cursor-pointer 
//             ${paymentMethod==="card" ? "border-orange-500 bg-orange-50" : ""}`}>

//             <input
//             type="radio"
//             value="card"
//             checked={paymentMethod === "card"}
//             onChange={(e)=>setPaymentMethod(e.target.value)}
//             />

//             <div>
//             <p className="font-medium">Credit / Debit Card</p>
//             <p className="text-xs text-gray-500">Visa, MasterCard, RuPay</p>
//             </div>

//             </label>

//             <label className={`flex items-center gap-3 border p-4 rounded-lg cursor-pointer 
//             ${paymentMethod==="cod" ? "border-orange-500 bg-orange-50" : ""}`}>

//             <input
//             type="radio"
//             value="cod"
//             checked={paymentMethod === "cod"}
//             onChange={(e)=>setPaymentMethod(e.target.value)}
//             />

//             <div>
//             <p className="font-medium">Cash On Delivery</p>
//             <p className="text-xs text-gray-500">Pay when product arrives</p>
//             </div>

//             </label>

//             </div>
//           </div>
//         </div>

//       {/* RIGHT COLUMN */}
//         <div className="space-y-6">

//           {/* CART ITEMS */}
//           <div className="bg-white p-6 rounded-2xl shadow border">
//             <h3 className="text-lg font-semibold mb-4">
//               Your Items ({cart.length})
//             </h3>

//             <div className="space-y-4 max-h-64 overflow-y-auto">
//               {cart.map((item) => (
//                 <div key={item.id} className="flex items-center gap-4">

//                   <img
//                     src={item.image || "/image/logo.png"}
//                     className="w-14 h-14 object-cover rounded-lg"
//                   />

//                   <div className="flex-1">
//                     <p className="font-medium text-sm">{item.name}</p>
//                     <p className="text-gray-500 text-xs">
//                       Qty: {item.quantity}
//                     </p>
//                   </div>

//                   <div className="font-semibold text-sm">
//                     ₹{(item.price * item.quantity).toFixed(2)}
//                   </div>

//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* COUPON */}
//           <div className="bg-white p-4 rounded-xl border">
//             <input
//               placeholder="Enter Coupon Code"
//               className="border p-2 rounded-lg w-full"
//             />
//           </div>

//           {/* ORDER SUMMARY */}
//           <div className="bg-white p-6 rounded-2xl shadow-lg border sticky top-20">

//             <h3 className="text-xl font-semibold mb-4">
//               Order Summary
//             </h3>

//             <p className="text-sm text-gray-500 mb-4">
//               {cart.length} items in your cart
//             </p>

//             <div className="space-y-3 text-gray-700">

//               <div className="flex justify-between">
//                 <span>Items Price</span>
//                 <span>₹{subtotal.toFixed(2)}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>GST (18%)</span>
//                 <span>₹{gst.toFixed(2)}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Delivery</span>
//                 <span className={deliveryCharge === 0 ? "text-green-600 font-medium" : ""}>
//                   {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge.toFixed(2)}`}
//                 </span>
//               </div>

//               {walletUsed && (
//                 <div className="flex justify-between text-green-600">
//                   <span>Wallet Discount</span>
//                   <span>- ₹{walletDeduction.toFixed(2)}</span>
//                 </div>
//               )}

//               <hr />

//               <div className="flex justify-between font-bold text-xl">
//                 <span>Total Payable</span>
//                 <span>₹{finalTotal.toFixed(2)}</span>
//               </div>

//             </div>

//             <button
//               onClick={handlePlaceOrder}
//               disabled={loading}
//               className="mt-6 w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-lg font-semibold hover:scale-[1.02] transition"
//             >
//               {loading ? "Processing..." : "Confirm Order"}
//             </button>

//             <p className="text-xs text-gray-500 mt-3 text-center">
//               🔒 Secure Checkout
//             </p>

//           </div>

//         </div>
//         </div>
//     </div>
//   );
// };

// export default Checkout;