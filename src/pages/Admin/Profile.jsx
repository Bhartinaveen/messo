import React, { useState } from "react";
import { User, Mail, Phone, Calendar, Edit, Save, X } from "lucide-react";

const Profile = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (!user) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onUpdate?.(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-300 to-orange-600 p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center text-3xl font-bold shadow">
              {formData.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{formData.name}</h2>
              <p className="text-sm opacity-90">{formData.email}</p>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition text-sm"
            >
              <Edit size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
              >
                <Save size={16} />
                Save
              </button>

              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition text-sm"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">

        {!isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <ProfileItem
              icon={<User size={18} />}
              label="Full Name"
              value={user.name}
            />

            <ProfileItem
              icon={<Mail size={18} />}
              label="Email"
              value={user.email}
            />

            <ProfileItem
              icon={<Phone size={18} />}
              label="Mobile"
              value={user.phone || "Not provided"}
            />

            <ProfileItem
              icon={<Calendar size={18} />}
              label="Member Since"
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"
              }
            />

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <InputField
              label="Mobile"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

          </div>
        )}

      </div>
    </div>
  );
};

/* Profile Display Item */

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
    <div className="text-indigo-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

/* Input Field */

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
    />
  </div>
);

export default Profile;