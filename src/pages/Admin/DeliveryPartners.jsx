import React, { useState, useEffect } from "react";
import { FaTruck, FaEdit, FaUndo } from "react-icons/fa";
import {
  getDeliveryPartners,
  saveDeliveryPartner,
  updateDeliveryPartner,
} from "../../utils/deliveryStorage";

const statusColor = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Terminated: "bg-red-100 text-red-700",
};

const DeliveryPartners = () => {
  const [partnerList, setPartnerList] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editMobile, setEditMobile] = useState("");

  useEffect(() => {
    const partners = getDeliveryPartners();
    setPartnerList(partners);
  }, []);

  const generatePartnerId = () => {
    return "DP" + Math.floor(100000 + Math.random() * 900000);
  };

  const handleAddPartner = () => {
    if (!name || !mobile) return;

    const newPartner = {
      uniqueId: generatePartnerId(),
      name,
      mobile,
      status: "Active",
      orders: 0,
      earnings: 0,
    };

    const updated = saveDeliveryPartner(newPartner);
    setPartnerList(updated);

    setName("");
    setMobile("");
  };

  const handleTerminate = (id) => {
    const updated = updateDeliveryPartner(id, { status: "Terminated" });
    setPartnerList(updated);
  };

  const handleReactivate = (id) => {
    const updated = updateDeliveryPartner(id, { status: "Active" });
    setPartnerList(updated);
  };

  const handleEditMobile = (id) => {
    const updated = updateDeliveryPartner(id, { mobile: editMobile });
    setPartnerList(updated);
    setEditingId(null);
  };

  const handleAssignOrder = (partner) => {
    const updated = updateDeliveryPartner(partner.uniqueId, {
      orders: (partner.orders || 0) + 1,
      earnings: (partner.earnings || 0) + 50,
    });

    setPartnerList(updated);
  };

  const totalEarnings = partnerList.reduce(
    (sum, p) => sum + (p.earnings || 0),
    0
  );

  return (
    <div className="bg-white shadow rounded-2xl p-4 sm:p-6">

      <h2 className="text-xl font-semibold mb-4">Delivery Partners</h2>

      {/* Earnings Dashboard */}
      <div className="bg-orange-50 p-4 rounded-lg mb-6 flex justify-between">
        <span className="font-medium">Total Partner Earnings</span>
        <span className="font-bold text-orange-600">₹{totalEarnings}</span>
      </div>

      {/* Add Partner */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Partner Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full"
        />

        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full"
        />

        <button
          onClick={handleAddPartner}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">

          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Partner</th>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Orders</th>
              <th className="p-3 text-left">Earnings</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {partnerList.map((p) => (
              <tr key={p.uniqueId} className="border-t">

                <td className="p-3 flex items-center gap-2">
                  <FaTruck className="text-orange-500" />
                  {p.name}
                </td>

                <td className="p-3">{p.uniqueId}</td>

                <td className="p-3">
                  {editingId === p.uniqueId ? (
                    <div className="flex gap-2">
                      <input
                        value={editMobile}
                        onChange={(e) => setEditMobile(e.target.value)}
                        className="border px-2 py-1 rounded"
                      />
                      <button
                        onClick={() => handleEditMobile(p.uniqueId)}
                        className="text-green-600"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {p.mobile}
                      <FaEdit
                        className="cursor-pointer text-gray-500"
                        onClick={() => {
                          setEditingId(p.uniqueId);
                          setEditMobile(p.mobile);
                        }}
                      />
                    </div>
                  )}
                </td>

                <td className="p-3">{p.orders || 0}</td>

                <td className="p-3 text-green-600 font-medium">
                  ₹{p.earnings || 0}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      statusColor[p.status]
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="p-3 flex flex-wrap gap-2">

                  {p.status !== "Terminated" && (
                    <button
                      onClick={() => handleAssignOrder(p)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Assign Order
                    </button>
                  )}

                  {p.status === "Terminated" ? (
                    <button
                      onClick={() => handleReactivate(p.uniqueId)}
                      className="bg-green-500 text-white px-2 py-1 rounded text-sm flex items-center gap-1"
                    >
                      <FaUndo /> Reactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleTerminate(p.uniqueId)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Terminate
                    </button>
                  )}

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default DeliveryPartners;