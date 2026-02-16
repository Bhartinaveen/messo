import React, { useEffect, useState } from "react";

const MyProfile = ({ user: initialUser = {}, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: initialUser.name || "",
    email: initialUser.email || "",
    phone: initialUser.phone || "",
    storeName: initialUser.storeName || "",
    businessType: initialUser.businessType || ""
  });
  const [avatar, setAvatar] = useState(initialUser.avatar || null);
  const [pwdOpen, setPwdOpen] = useState(false);
  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });

  useEffect(() => {
    // keep in sync with incoming prop or localStorage
    const stored = JSON.parse(localStorage.getItem("user")) || initialUser;
    setFormData((f) => ({ ...f, name: stored.name || f.name, email: stored.email || f.email, phone: stored.phone || f.phone, storeName: stored.storeName || f.storeName, businessType: stored.businessType || f.businessType }));
    setAvatar(stored.avatar || avatar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUser]);

  const handleEditClick = () => setIsEditing(true);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) return "Valid email required";
    return null;
  };

  const handleSave = () => {
    const err = validate();
    if (err) return setMessage(err);

    const updated = { ...initialUser, ...formData, avatar };
    localStorage.setItem("user", JSON.stringify(updated));
    setIsEditing(false);
    setMessage("Profile saved successfully");
    setTimeout(() => setMessage(""), 2500);
    // dispatch an event so other components (Navbar) can react immediately
    try {
      window.dispatchEvent(new Event('user-updated'));
    } catch (e) {}
    if (typeof onUpdate === "function") onUpdate(updated);
  };

  const handleCancel = () => {
    setFormData({ name: initialUser.name || "", email: initialUser.email || "", phone: initialUser.phone || "", storeName: initialUser.storeName || "", businessType: initialUser.businessType || "" });
    setAvatar(initialUser.avatar || null);
    setIsEditing(false);
    setMessage("");
    setPasswords({ newPassword: "", confirmPassword: "" });
    setPwdOpen(false);
  };

  const handlePwdChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleChangePassword = () => {
    if (passwords.newPassword.length < 6) return setMessage("Password must be at least 6 characters");
    if (passwords.newPassword !== passwords.confirmPassword) return setMessage("Passwords do not match");

    // In real app: call backend to update password. Here we just show success
    setMessage("Password updated");
    setTimeout(() => setMessage(""), 2500);
    setPasswords({ newPassword: "", confirmPassword: "" });
    setPwdOpen(false);
  };

  return (
    <div className="max-w-2xl bg-white rounded-xl shadow p-4">
      <div className="flex items-center justify-between pb-3 border-b">
        <h2 className="font-semibold text-lg">My Profile</h2>
        {!isEditing ? (
          <button onClick={handleEditClick} className="text-sm px-4 py-1 bg-orange-500 text-white rounded">Edit</button>
        ) : (
          <div className="space-x-2">
            <button onClick={handleSave} className="text-sm px-4 py-1 bg-green-500 text-white rounded">Save</button>
            <button onClick={handleCancel} className="text-sm px-4 py-1 bg-gray-300 text-black rounded">Cancel</button>
          </div>
        )}
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
             <div className="w-full h-full flex items-center justify-center bg-orange-500 text-white text-3xl font-semibold">
              {(formData.name || "U").charAt(0).toUpperCase()}
            </div>
            )}
          </div>
          {isEditing && (
            <input type="file" accept="image/*" onChange={handleAvatar} className="mt-2 text-sm" />
          )}
        </div>

        <div className="md:col-span-2 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-lg p-2 mt-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-lg p-2 mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-lg p-2 mt-1" />
            </div>
          </div>

          <div className="mt-2">
            <button onClick={() => setPwdOpen((s) => !s)} className="text-sm text-blue-600">{pwdOpen ? "Hide" : "Change Password"}</button>
            {pwdOpen && (
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                <input name="newPassword" type="password" placeholder="New password" value={passwords.newPassword} onChange={handlePwdChange} className="border rounded-lg p-2" />
                <input name="confirmPassword" type="password" placeholder="Confirm password" value={passwords.confirmPassword} onChange={handlePwdChange} className="border rounded-lg p-2" />
                <div className="md:col-span-2">
                  <button onClick={handleChangePassword} className="py-2 px-3 bg-orange-500 text-white rounded mt-2">Update Password</button>
                </div>
              </div>
            )}
          </div>

          {message && <div className="text-sm text-green-600 mt-2">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
