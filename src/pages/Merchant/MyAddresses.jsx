import React, { useEffect, useState } from "react";

const MyAddresses = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const storageKey = `addresses_${user.id || "guest"}`;

  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    house: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
  });

  /* ================= LOAD / SAVE ================= */

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    setAddresses(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(addresses));
  }, [addresses, storageKey]);

  /* ================= HANDLERS ================= */

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      house: "",
      city: "",
      state: "",
      pincode: "",
      type: "Home",
    });
    setEditingId(null);
  };

  const handleAddOrUpdate = () => {
    const { name, phone, house, city, state, pincode } = form;
    if (!name || !phone || !house || !city || !state || !pincode) return;

    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...form } : a))
      );
    } else {
      setAddresses((prev) => [
        ...prev,
        { id: Date.now(), ...form, default: prev.length === 0 },
      ]);
    }

    resetForm();
  };

  const handleEdit = (addr) => {
    setForm({
      name: addr.name,
      phone: addr.phone,
      house: addr.house,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      type: addr.type,
    });
    setEditingId(addr.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this address?")) return;
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefault = (id) =>
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, default: a.id === id }))
    );

  /* ================= UI ================= */

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">My Addresses</h2>

      {/* ===== FORM ===== */}
      <div className="bg-white p-5 rounded-2xl shadow space-y-3">
        <p className="font-medium text-gray-700">
          {editingId ? "Edit Address" : "Add New Address"}
        </p>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border rounded-lg p-3"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          maxLength={10}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="house"
          value={form.house}
          onChange={handleChange}
          placeholder="House No, Building, Street"
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
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          maxLength={6}
          className="w-full border rounded-lg p-3"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option>Home</option>
          <option>Work</option>
          <option>Other</option>
        </select>

        <button
          onClick={handleAddOrUpdate}
          className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition"
        >
          {editingId ? "Update Address" : "+ Add Address"}
        </button>
      </div>

      {/* ===== EMPTY ===== */}
      {addresses.length === 0 && (
        <p className="text-center text-gray-500 text-sm">
          No addresses added yet — add one to make checkout faster.
        </p>
      )}

      {/* ===== ADDRESS LIST ===== */}
      {addresses.map((a) => (
        <div key={a.id} className="bg-white p-5 rounded-2xl shadow space-y-2">
          <div className="flex justify-between items-center">
            <p className="font-semibold">
              {a.name}
              <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                {a.type}
              </span>
            </p>

            {a.default && (
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                Default
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600">
            {a.house}, {a.city}, {a.state} - {a.pincode}
          </p>

          <p className="text-sm text-gray-700">{a.phone}</p>

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
            {!a.default && (
              <button
                onClick={() => setDefault(a.id)}
                className="text-green-600"
              >
                Set Default
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAddresses;
