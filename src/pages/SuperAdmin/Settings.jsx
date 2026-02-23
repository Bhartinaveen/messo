import React, { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    allowRegistration: true,
    allowVendors: true,
    maintenanceMode: false,
    currency: "INR",
    commissionRate: 10,
    minWithdrawal: 500,
    autoCancelMinutes: 30,
    codEnabled: true,
    returnWindow: 7,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("Saved Settings:", settings);
    alert("Settings Saved (Connect to Backend API)");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">
      <h2 className="text-xl font-semibold">Super Admin Settings</h2>

      {/* Platform Controls */}
      <div>
        <h3 className="font-semibold mb-2">Platform Controls</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="allowRegistration" checked={settings.allowRegistration} onChange={handleChange} />
            Allow User Registration
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="allowVendors" checked={settings.allowVendors} onChange={handleChange} />
            Allow Vendors
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} />
            Maintenance Mode
          </label>

          <div>
            <label className="text-sm text-gray-500">Default Currency</label>
            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 mt-1"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Commission Settings */}
      <div>
        <h3 className="font-semibold mb-2">Commission Settings</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Vendor Commission (%)</label>
            <input
              type="number"
              name="commissionRate"
              value={settings.commissionRate}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Minimum Withdrawal (₹)</label>
            <input
              type="number"
              name="minWithdrawal"
              value={settings.minWithdrawal}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </div>
        </div>
      </div>

      {/* Order Controls */}
      <div>
        <h3 className="font-semibold mb-2">Order Controls</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Auto Cancel Time (minutes)</label>
            <input
              type="number"
              name="autoCancelMinutes"
              value={settings.autoCancelMinutes}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </div>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="codEnabled" checked={settings.codEnabled} onChange={handleChange} />
            Enable Cash on Delivery
          </label>

          <div>
            <label className="text-sm text-gray-500">Return Window (days)</label>
            <input
              type="number"
              name="returnWindow"
              value={settings.returnWindow}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;