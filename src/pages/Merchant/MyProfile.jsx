// import React, { useEffect, useState } from "react";

// const MyProfile = ({ user: initialUser = {}, onUpdate }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [message, setMessage] = useState("");

//   const [formData, setFormData] = useState({
//     name: initialUser.name || "",
//     email: initialUser.email || "",
//     phone: initialUser.phone || "",
//     address: initialUser.address || "",
//     storeName: initialUser.storeName || "",
//     businessType: initialUser.businessType || ""
//   });

//   const [avatar, setAvatar] = useState(initialUser.avatar || null);

//   const [pwdOpen, setPwdOpen] = useState(false);

//   const [passwords, setPasswords] = useState({
//     newPassword: "",
//     confirmPassword: ""
//   });

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("user"));

//     if (stored) {
//       setFormData({
//         name: stored.name || "",
//         email: stored.email || "",
//         phone: stored.phone || "",
//         address: stored.address || "",
//         storeName: stored.storeName || "",
//         businessType: stored.businessType || ""
//       });

//       setAvatar(stored.avatar || null);
//     }
//   }, []);

//   const handleEditClick = () => setIsEditing(true);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = () => {
//       setAvatar(reader.result);
//     };

//     reader.readAsDataURL(file);
//   };

//   const validate = () => {
//     if (!formData.name.trim()) return "Name is required";

//     if (!formData.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email))
//       return "Valid email required";

//     return null;
//   };

//   const handleSave = () => {
//     const err = validate();

//     if (err) return setMessage(err);

//     const updated = { ...initialUser, ...formData, avatar };

//     localStorage.setItem("user", JSON.stringify(updated));

//     setIsEditing(false);

//     setMessage("Profile updated successfully");

//     setTimeout(() => setMessage(""), 2500);

//     try {
//       window.dispatchEvent(new Event("user-updated"));
//     } catch (e) {}

//     if (typeof onUpdate === "function") onUpdate(updated);
//   };

//   const handleCancel = () => {
//     const stored = JSON.parse(localStorage.getItem("user"));

//     if (stored) {
//       setFormData({
//         name: stored.name || "",
//         email: stored.email || "",
//         phone: stored.phone || "",
//         address: stored.address || "",
//         storeName: stored.storeName || "",
//         businessType: stored.businessType || ""
//       });

//       setAvatar(stored.avatar || null);
//     }

//     setIsEditing(false);
//   };

//   const handlePwdChange = (e) => {
//     setPasswords({ ...passwords, [e.target.name]: e.target.value });
//   };

//   const handleChangePassword = () => {
//     if (passwords.newPassword.length < 6)
//       return setMessage("Password must be at least 6 characters");

//     if (passwords.newPassword !== passwords.confirmPassword)
//       return setMessage("Passwords do not match");

//     setMessage("Password updated successfully");

//     setTimeout(() => setMessage(""), 2500);

//     setPasswords({
//       newPassword: "",
//       confirmPassword: ""
//     });

//     setPwdOpen(false);
//   };

//   return (
//     <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">

//       {/* Banner */}
//       <div className="h-36 bg-gradient-to-r from-orange-500 to-yellow-400 relative">

//         {/* Avatar */}
//         <div className="absolute -bottom-12 left-8">
//           <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg flex items-center justify-center bg-orange-500 text-white text-3xl font-bold">
//             {avatar ? (
//               <img
//                 src={avatar}
//                 alt="avatar"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               formData.name?.charAt(0)?.toUpperCase()
//             )}
//           </div>
//         </div>

//         {/* Change Avatar */}
//         {isEditing && (
//           <label className="absolute bottom-2 left-36 bg-black text-white px-3 py-1 rounded text-xs cursor-pointer">
//             Change
//             <input
//               type="file"
//               className="hidden"
//               accept="image/*"
//               onChange={handleAvatarChange}
//             />
//           </label>
//         )}
//       </div>

//       {/* Profile Section */}
//       <div className="pt-16 px-8 pb-8">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h2 className="text-2xl font-bold">{formData.name}</h2>
//             <p className="text-gray-500">{formData.email}</p>
//           </div>

//           {!isEditing ? (
//             <button
//               onClick={handleEditClick}
//               className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600"
//             >
//               Edit Profile
//             </button>
//           ) : (
//             <div className="space-x-2">
//               <button
//                 onClick={handleSave}
//                 className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
//               >
//                 Save
//               </button>

//               <button
//                 onClick={handleCancel}
//                 className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500"
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Form */}
//         <div className="grid md:grid-cols-2 gap-5">

//           <Input
//             label="Full Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             isEditing={isEditing}
//           />

//           <Input
//             label="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             isEditing={isEditing}
//           />

//           <Input
//             label="Phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             isEditing={isEditing}
//           />

//         </div>

//         {/* Address */}
//         <div className="mt-4">
//           <label className="block text-sm font-semibold mb-1">Address</label>
//          {isEditing ? (
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               rows="2"
//               className="w-full border rounded-lg px-3 py-2 bg-white"
//             />
//           ) : (
//             <div className="w-full px-3 py-2 bg-gray-100 rounded-lg text-gray-800">
//               {formData.address || "—"}
//             </div>
//           )}
//         </div>

//         {/* Password Section */}
//         <div className="mt-4">
//           <button
//             onClick={() => setPwdOpen(!pwdOpen)}
//             className="text-blue-600 text-sm"
//           >
//             {pwdOpen ? "Hide Password Change" : "Change Password"}
//           </button>

//           {pwdOpen && (
//             <div className="grid md:grid-cols-2 gap-3 mt-3">

//               <input
//                 type="password"
//                 name="newPassword"
//                 placeholder="New Password"
//                 value={passwords.newPassword}
//                 onChange={handlePwdChange}
//                 className="border rounded-lg p-2"
//               />

//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 value={passwords.confirmPassword}
//                 onChange={handlePwdChange}
//                 className="border rounded-lg p-2"
//               />

//               <div className="md:col-span-2">
//                 <button
//                   onClick={handleChangePassword}
//                   className="bg-orange-500 text-white px-4 py-2 rounded"
//                 >
//                   Update Password
//                 </button>
//               </div>

//             </div>
//           )}
//         </div>

//         {message && (
//           <div className="text-green-600 text-sm mt-4">{message}</div>
//         )}

//       </div>
//     </div>
//   );
// };

// const Input = ({ label, name, value, onChange, isEditing }) => (
//   <div>
//     <label className="block text-sm font-semibold mb-1">{label}</label>

//     {isEditing ? (
//       <input
//         type="text"
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full border rounded-lg px-3 py-2 bg-white border-gray-300"
//       />
//     ) : (
//       <div className="w-full px-3 py-2 bg-gray-100 rounded-lg text-gray-800">
//         {value || "—"}
//       </div>
//     )}
//   </div>
// );

// export default MyProfile;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MyProfile = ({ user: initialUser = {}, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: initialUser.name || "",
    email: initialUser.email || "",
    phone: initialUser.phone || ""
  });

  const [avatar, setAvatar] = useState(initialUser.avatar || null);

  const [pwdOpen, setPwdOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: initialUser.name || "",
      email: initialUser.email || "",
      phone: initialUser.phone || ""
    });
    setAvatar(initialUser.avatar || null);
  }, [initialUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email))
      return "Valid email required";
    return null;
  };

  const handleSave = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(`${BASE_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessage("Profile updated successfully");
      setIsEditing(false);

      if (onUpdate) onUpdate(data.user);

    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
    setMessage("");
    setFormData({
      name: initialUser.name || "",
      email: initialUser.email || "",
      phone: initialUser.phone || ""
    });
  };

  const handlePwdChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword.length < 6)
      return setError("Password must be at least 6 characters");

    if (passwords.newPassword !== passwords.confirmPassword)
      return setError("Passwords do not match");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password: passwords.newPassword })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessage("Password updated successfully");
      setPwdOpen(false);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

      {/* Banner */}
      <div className="h-40 bg-gradient-to-r from-orange-500 to-yellow-400 relative">

        {/* Avatar */}
        <div className="absolute -bottom-12 left-8">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-orange-500 flex items-center justify-center text-white text-3xl font-bold">

            {avatar ? (
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              formData.name?.charAt(0)?.toUpperCase()
            )}

          </div>
        </div>

        {isEditing && (
          <label className="absolute bottom-2 left-36 bg-black text-white text-xs px-3 py-1 rounded cursor-pointer">
            Change
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </label>
        )}
      </div>

      {/* Profile Body */}
      <div className="pt-16 px-8 pb-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {formData.name}
            </h2>

            <p className="text-gray-500">{formData.email}</p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">

              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Save
              </button>

              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>

            </div>
          )}
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-6">

          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isEditing={isEditing}
          />

          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isEditing={isEditing}
          />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            isEditing={isEditing}
          />

        </div>

        {/* Password Section */}
        <div className="mt-8 border-t pt-6">

          <button
            onClick={() => setPwdOpen(!pwdOpen)}
            className="text-orange-600 font-semibold"
          >
            {pwdOpen ? "Hide Password Change" : "Change Password"}
          </button>

          {pwdOpen && (
            <div className="grid md:grid-cols-2 gap-4 mt-4">

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={handlePwdChange}
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={passwords.confirmPassword}
                onChange={handlePwdChange}
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <div className="md:col-span-2">
                <button
                  onClick={handleChangePassword}
                  className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600"
                >
                  Update Password
                </button>
              </div>

            </div>
          )}
        </div>

        {message && (
          <p className="text-green-600 mt-4">{message}</p>
        )}

        {error && (
          <p className="text-red-600 mt-4">{error}</p>
        )}

      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange, isEditing }) => (
  <div>
    <label className="block text-sm font-semibold mb-1 text-gray-700">
      {label}
    </label>

    {isEditing ? (
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
      />
    ) : (
      <div className="bg-gray-100 px-3 py-2 rounded-lg">
        {value || "—"}
      </div>
    )}
  </div>
);

export default MyProfile;