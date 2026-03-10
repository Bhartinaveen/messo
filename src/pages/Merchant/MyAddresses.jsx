// import React, { useEffect, useState } from "react";

// const MyAddresses = () => {
//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const storageKey = `addresses_${user.id || "guest"}`;

//   const [addresses, setAddresses] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     house: "",
//     city: "",
//     state: "",
//     pincode: "",
//     type: "Home",
//   });

//   /* ================= LOAD / SAVE ================= */

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
//     setAddresses(saved);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     localStorage.setItem(storageKey, JSON.stringify(addresses));
//   }, [addresses, storageKey]);

//   /* ================= HANDLERS ================= */

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const resetForm = () => {
//     setForm({
//       name: "",
//       phone: "",
//       house: "",
//       city: "",
//       state: "",
//       pincode: "",
//       type: "Home",
//     });
//     setEditingId(null);
//   };

//   const handleAddOrUpdate = () => {
//     const { name, phone, house, city, state, pincode } = form;
//     if (!name || !phone || !house || !city || !state || !pincode) return;

//     if (editingId) {
//       setAddresses((prev) =>
//         prev.map((a) => (a.id === editingId ? { ...a, ...form } : a))
//       );
//     } else {
//       setAddresses((prev) => [
//         ...prev,
//         { id: Date.now(), ...form, default: prev.length === 0 },
//       ]);
//     }

//     resetForm();
//   };

//   const handleEdit = (addr) => {
//     setForm({
//       name: addr.name,
//       phone: addr.phone,
//       house: addr.house,
//       city: addr.city,
//       state: addr.state,
//       pincode: addr.pincode,
//       type: addr.type,
//     });
//     setEditingId(addr.id);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = (id) => {
//     if (!window.confirm("Delete this address?")) return;
//     setAddresses((prev) => prev.filter((a) => a.id !== id));
//   };

//   const setDefault = (id) =>
//     setAddresses((prev) =>
//       prev.map((a) => ({ ...a, default: a.id === id }))
//     );

//   /* ================= UI ================= */

//   return (
//     <div className="max-w-xl mx-auto space-y-6">
//       <h2 className="text-xl font-semibold">My Addresses</h2>

//       {/* ===== FORM ===== */}
//       <div className="bg-white p-5 rounded-2xl shadow space-y-3">
//         <p className="font-medium text-gray-700">
//           {editingId ? "Edit Address" : "Add New Address"}
//         </p>

//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Full Name"
//           className="w-full border rounded-lg p-3"
//         />

//         <input
//           name="phone"
//           value={form.phone}
//           onChange={handleChange}
//           placeholder="Phone Number"
//           maxLength={10}
//           className="w-full border rounded-lg p-3"
//         />

//         <input
//           name="house"
//           value={form.house}
//           onChange={handleChange}
//           placeholder="House No, Building, Street"
//           className="w-full border rounded-lg p-3"
//         />

//         <div className="grid grid-cols-2 gap-3">
//           <input
//             name="city"
//             value={form.city}
//             onChange={handleChange}
//             placeholder="City"
//             className="border rounded-lg p-3"
//           />

//           <input
//             name="state"
//             value={form.state}
//             onChange={handleChange}
//             placeholder="State"
//             className="border rounded-lg p-3"
//           />
//         </div>

//         <input
//           name="pincode"
//           value={form.pincode}
//           onChange={handleChange}
//           placeholder="Pincode"
//           maxLength={6}
//           className="w-full border rounded-lg p-3"
//         />

//         <select
//           name="type"
//           value={form.type}
//           onChange={handleChange}
//           className="w-full border rounded-lg p-3"
//         >
//           <option>Home</option>
//           <option>Work</option>
//           <option>Other</option>
//         </select>

//         <button
//           onClick={handleAddOrUpdate}
//           className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition"
//         >
//           {editingId ? "Update Address" : "+ Add Address"}
//         </button>
//       </div>

//       {/* ===== EMPTY ===== */}
//       {addresses.length === 0 && (
//         <p className="text-center text-gray-500 text-sm">
//           No addresses added yet — add one to make checkout faster.
//         </p>
//       )}

//       {/* ===== ADDRESS LIST ===== */}
//       {addresses.map((a) => (
//         <div key={a.id} className="bg-white p-5 rounded-2xl shadow space-y-2">
//           <div className="flex justify-between items-center">
//             <p className="font-semibold">
//               {a.name}
//               <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
//                 {a.type}
//               </span>
//             </p>

//             {a.default && (
//               <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
//                 Default
//               </span>
//             )}
//           </div>

//           <p className="text-sm text-gray-600">
//             {a.house}, {a.city}, {a.state} - {a.pincode}
//           </p>

//           <p className="text-sm text-gray-700">{a.phone}</p>

//           <div className="flex gap-4 pt-2 text-sm">
//             <button
//               onClick={() => handleEdit(a)}
//               className="text-orange-500"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(a.id)}
//               className="text-red-500"
//             >
//               Delete
//             </button>
//             {!a.default && (
//               <button
//                 onClick={() => setDefault(a.id)}
//                 className="text-green-600"
//               >
//                 Set Default
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyAddresses;

// frontend/src/pages/Merchant/MyAddresses.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MyAddresses = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India", // Default country
    isDefault: false,
  });

  const token = localStorage.getItem('token');

  /* ================= LOAD ADDRESSES ================= */
  const fetchAddresses = async () => {
    setLoading(true);
    setError('');
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      const res = await fetch(`${BASE_URL}/addresses`, { // CORRECTED: Removed extra '/api' here
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch addresses');
      }
      setAddresses(data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setError(err.message || "Failed to load addresses.");
      // if it's an auth error, navigate to login
      if (err.message.includes('authorized')) { // Check for specific unauthorized message
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [navigate, token]); // Add token to dependency array to re-fetch if token changes

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const resetForm = () => {
    setForm({
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      isDefault: false,
    });
    setEditingId(null);
    setError('');
    setMessage('');
  };

  const handleAddOrUpdate = async () => {
    const { addressLine1, city, state, postalCode } = form;
    if (!addressLine1 || !city || !state || !postalCode) {
      setError("Please fill in all required address fields: House No/Street, City, State, Pincode.");
      return;
    }
    setLoading(true);
    setError('');

    try {
      let res;
      let data;
      if (editingId) {
        // Update existing address
        res = await fetch(`${BASE_URL}/addresses/${editingId}`, { // CORRECTED: Removed extra '/api' here
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(form)
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to update address');
        setMessage('Address updated successfully!');
      } else {
        // Add new address
        res = await fetch(`${BASE_URL}/addresses`, { // CORRECTED: Removed extra '/api' here
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(form)
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to add address');
        setMessage('Address added successfully!');
      }
      fetchAddresses(); // Re-fetch all addresses to update the list
      resetForm();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error("Error saving address:", err);
      setError(err.message || "Failed to save address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (addr) => {
    setForm({
      addressLine1: addr.addressLine1 || "",
      addressLine2: addr.addressLine2 || "",
      city: addr.city || "",
      state: addr.state || "",
      postalCode: addr.postalCode || "",
      country: addr.country || "India",
      isDefault: addr.isDefault || false,
    });
    setEditingId(addr.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/addresses/${id}`, { // CORRECTED: Removed extra '/api' here
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete address');
      setMessage('Address deleted successfully!');
      fetchAddresses(); // Re-fetch
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error("Error deleting address:", err);
      setError(err.message || "Failed to delete address.");
    } finally {
      setLoading(false);
    }
  };

  const setDefault = async (id) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/addresses/${id}/default`, { // CORRECTED: Removed extra '/api' here
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to set default address');
      setMessage('Default address set!');
      fetchAddresses(); // Re-fetch
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error("Error setting default address:", err);
      setError(err.message || "Failed to set default address.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">My Addresses</h2>

      {message && <div className="p-3 bg-green-100 text-green-700 rounded-lg">{message}</div>}
      {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

      {/* ===== FORM ===== */}
      <div className="bg-white p-5 rounded-2xl shadow space-y-3">
        <p className="font-medium text-gray-700">
          {editingId ? "Edit Address" : "Add New Address"}
        </p>

        <input
          name="addressLine1"
          value={form.addressLine1}
          onChange={handleChange}
          placeholder="House No, Building, Street *"
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          name="addressLine2"
          value={form.addressLine2}
          onChange={handleChange}
          placeholder="Area, Landmark (Optional)"
          className="w-full border rounded-lg p-3"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City *"
            className="border rounded-lg p-3"
            required
          />

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State *"
            className="border rounded-lg p-3"
            required
          />
        </div>

        <input
          name="postalCode"
          value={form.postalCode}
          onChange={handleChange}
          placeholder="Pincode *"
          maxLength={6}
          className="w-full border rounded-lg p-3"
          required
        />
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country (e.g., India)"
          className="w-full border rounded-lg p-3"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isDefault"
            checked={form.isDefault}
            onChange={handleChange}
            className="accent-orange-500"
          />
          Set as Default Address
        </label>

        <button
          onClick={handleAddOrUpdate}
          disabled={loading}
          className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition"
        >
          {loading ? "Saving..." : editingId ? "Update Address" : "+ Add Address"}
        </button>
        {editingId && (
            <button
                onClick={resetForm}
                disabled={loading}
                className="w-full py-3 bg-gray-400 text-white rounded-xl font-medium hover:bg-gray-500 transition mt-2"
            >
                Cancel Edit
            </button>
        )}
      </div>

      {/* ===== EMPTY ===== */}
      {loading ? (
        <p className="text-center text-gray-500 text-sm">Loading addresses...</p>
      ) : addresses.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">
          No addresses added yet — add one to make checkout faster.
        </p>
      ) : (
        /* ===== ADDRESS LIST ===== */
        addresses.map((a) => (
          <div key={a.id} className="bg-white p-5 rounded-2xl shadow space-y-2">
            <div className="flex justify-between items-center">
              <p className="font-semibold">
                {a.addressLine1}
                <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                  Address
                </span>
              </p>

              {a.isDefault && (
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  Default
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600">
              {a.addressLine1}, {a.addressLine2 && `${a.addressLine2}, `}
              {a.city}, {a.state} - {a.postalCode}
            </p>
            <p className="text-sm text-gray-700">{a.country}</p>


            <div className="flex gap-4 pt-2 text-sm">
              <button
                onClick={() => handleEdit(a)}
                className="text-orange-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(a.id)}
                className="text-red-500"
              >
                Delete
              </button>
              {!a.isDefault && (
                <button
                  onClick={() => setDefault(a.id)}
                  className="text-green-600"
                >
                  Set Default
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAddresses;