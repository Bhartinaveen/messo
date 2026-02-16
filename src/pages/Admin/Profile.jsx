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
    if (onUpdate) {
      onUpdate(formData); // send updated data to parent
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 transition hover:shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-6">
        
        <div className="flex items-center gap-4">
          
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold">
            {formData.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              {formData.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {formData.email}
            </p>
          </div>
        </div>

        {/* Edit / Save Buttons */}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
          >
            <Edit size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition text-sm"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t pt-6">
        {!isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div className="flex items-center gap-3">
              <User className="text-indigo-500" size={18} />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-indigo-500" size={18} />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-indigo-500" size={18} />
              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="font-medium">
                  {user.phone || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-indigo-500" size={18} />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Mobile</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
