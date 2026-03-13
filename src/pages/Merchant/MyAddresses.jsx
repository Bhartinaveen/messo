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
    country: "India",
    isDefault: false,
  });

  const token = localStorage.getItem('token');

  /* ================= LOAD ADDRESSES ================= */

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/addresses`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setAddresses(data);
    } catch (err) {
      setError("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
    fetchAddresses();
  }, []);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
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
      addressType: "Home",
      isDefault: false,
    });
    setEditingId(null);
  };

  const handleAddOrUpdate = async () => {

    const { addressLine1, city, state, postalCode } = form;

    if (!addressLine1 || !city || !state || !postalCode) {
      setError("Please fill all required fields");
      return;
    }

    try {

      let res;

      if (editingId) {
        res = await fetch(`${BASE_URL}/addresses/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(form)
        });

        setMessage("Address updated successfully");

      } else {

        res = await fetch(`${BASE_URL}/addresses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(form)
        });

        setMessage("Address added successfully");
      }

      fetchAddresses();
      resetForm();

    } catch (err) {
      setError("Failed to save address");
    }
  };

  const handleEdit = (addr) => {
    setForm(addr);
    setEditingId(addr.id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this address?")) return;

    await fetch(`${BASE_URL}/addresses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchAddresses();
  };

  const setDefault = async (id) => {

    await fetch(`${BASE_URL}/addresses/${id}/default`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchAddresses();
  };

  /* ================= UI ================= */

  return (

    <div className="max-w-6xl mx-auto px-4 py-6">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Addresses
      </h2>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Layout */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* ================= FORM ================= */}

        <div className="bg-white p-6 rounded-2xl shadow-md h-fit md:sticky md:top-6">

          <h3 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Address" : "Add New Address"}
          </h3>

          <div className="space-y-3">

            <input
              name="addressLine1"
              value={form.addressLine1}
              onChange={handleChange}
              placeholder="House No, Building, Street *"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
            />

            <input
              name="addressLine2"
              value={form.addressLine2}
              onChange={handleChange}
              placeholder="Area / Landmark"
              className="w-full border rounded-lg p-3"
            />

            <div className="grid grid-cols-2 gap-3">

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="border rounded-lg p-3"
              />

              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className="border rounded-lg p-3"
              />

            </div>

            <input
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              placeholder="Pincode"
              maxLength={6}
              className="w-full border rounded-lg p-3"
            />

            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <select
                name="addressType"
                value={form.addressType}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-white"
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="isDefault"
                checked={form.isDefault}
                onChange={handleChange}
                className="accent-orange-500"
              />
              Set as default address
            </label>

            <button
              onClick={handleAddOrUpdate}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium"
            >
              {editingId ? "Update Address" : "Add Address"}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
                className="w-full py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-xl"
              >
                Cancel Edit
              </button>
            )}

          </div>
        </div>

        {/* ================= ADDRESS LIST ================= */}

        <div className="space-y-4">

          {loading ? (
            <p className="text-gray-500">Loading addresses...</p>
          ) : addresses.length === 0 ? (
            <p className="text-gray-500">
              No addresses added yet.
            </p>
          ) : (
            addresses.map((a) => (

              <div
                key={a.id}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition"
              >

                <div className="flex justify-between items-center mb-2">

                  <p className="font-semibold text-gray-800">
                    {a.addressLine1}
                  </p>

                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {a.addressType}
                    </span>

                  {a.isDefault && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}

                </div>

                <p className="text-sm text-gray-600">
                  {a.addressLine1},
                  {a.addressLine2 && ` ${a.addressLine2},`}
                  {a.city}, {a.state} - {a.postalCode}
                </p>

                <p className="text-sm text-gray-700">
                  {a.country}
                </p>

                <div className="flex gap-4 mt-3 text-sm">

                  <button
                    onClick={() => handleEdit(a)}
                    className="text-orange-500 font-medium"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-500 font-medium"
                  >
                    Delete
                  </button>

                  {!a.isDefault && (
                    <button
                      onClick={() => setDefault(a.id)}
                      className="text-green-600 font-medium"
                    >
                      Set Default
                    </button>
                  )}

                </div>

              </div>

            ))
          )}

        </div>

      </div>

    </div>
  );
};

export default MyAddresses;