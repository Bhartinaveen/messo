
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import {
//   FaTachometerAlt,
//   FaUser,
//   FaBox,
//   FaWallet,
//   FaMapMarkerAlt,
//   FaHeart,
//   FaHeadset,
//   FaStore,
//   FaSignOutAlt
// } from "react-icons/fa";

// // Tabs
// import Dashboard from "./Merchant/Dashboard";
// import MyProfile from "./Merchant/MyProfile";
// import MyOrders from "./Merchant/MyOrders";
// import MyWallet from "./Merchant/MyWallet";
// import MyAddresses from "./Merchant/MyAddresses";
// import Wishlist from "./Merchant/Wishlist";
// import Support from "./Merchant/Support";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("Dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (!stored) {
//       navigate("/login");
//       return;
//     }
//     setUser(JSON.parse(stored));
//   }, [navigate]);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const handleBackToStore = () => {
//     navigate("/");
//   };

//   if (!user) return null;

//   const menuItems = [
//     { name: "Dashboard", icon: <FaTachometerAlt /> },
//     { name: "My Profile", icon: <FaUser /> },
//     { name: "My Orders", icon: <FaBox /> },
//     { name: "My Wallet", icon: <FaWallet /> },
//     { name: "My Addresses", icon: <FaMapMarkerAlt /> },
//     { name: "Wishlist", icon: <FaHeart /> },
//     { name: "Support", icon: <FaHeadset /> },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Dashboard":
//         return <Dashboard user={user} />;
//       case "My Profile":
//         return <MyProfile user={user} />;
//       case "My Orders":
//         return <MyOrders user={user} />;
//       case "My Wallet":
//         return <MyWallet user={user} />;
//       case "My Addresses":
//         return <MyAddresses user={user} />;
//       case "Wishlist":
//         return <Wishlist user={user} />;
//       case "Support":
//         return <Support user={user} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="h-screen flex bg-gray-100 relative">

//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       <aside
//         className={`fixed lg:static z-40 top-0 left-0 h-full w-64
//         bg-black text-white flex flex-col
//         mt-16 lg:mt-0
//         transform transition-transform duration-300
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0`}
//       >

//         <div className="p-6 border-b border-orange-300 flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-white">My Account</h2>
//           <button
//             className="lg:hidden w-9 h-9 flex items-center justify-center
//             bg-white text-orange-600 rounded-full shadow"
//             onClick={() => setSidebarOpen(false)}
//           >
//             ✕
//           </button>
//         </div>

//         <nav className="py-4 space-y-2 flex-1">

//           {menuItems.map((item) => (
//             <div
//               key={item.name}
//               onClick={() => {
//                 setActiveTab(item.name);
//                 setSidebarOpen(false);
//               }}
//               className={`flex items-center gap-3 px-6 py-3 ml-3 rounded-l-full cursor-pointer font-bold transition
//               ${
//                 activeTab === item.name
//                   ? "bg-white text-orange-600 font-semibold"
//                   : "text-gray-300 hover:bg-yellow-500 hover:text-black"
//               }`}
//             >
//               <span className="text-lg">{item.icon}</span>
//               <span className="whitespace-nowrap">{item.name}</span>
//             </div>
//           ))}

//           <div
//             onClick={handleBackToStore}
//             className="flex items-center gap-3 px-6 py-3 ml-3 mt-4 rounded-l-full cursor-pointer font-bold
//             text-gray-300 hover:bg-blue-500 hover:text-white transition"
//           >
//             <span className="text-lg">
//               <FaStore/>
//             </span>
//             <span>Back to Store</span>
//           </div>

//           <div
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-6 py-3 ml-3 mt-2 rounded-l-full cursor-pointer font-bold
//             text-gray-300 hover:bg-red-600 hover:text-white transition"
//           >
//             <span className="text-lg">
//               <FaSignOutAlt />
//             </span>
//             <span>Logout</span>
//           </div>

//         </nav>
//       </aside>

//       <main className="flex-1 p-4 md:p-6 overflow-y-auto">

//         <div className="lg:hidden flex items-center justify-between mb-4">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="text-2xl font-bold"
//           >
//             ☰
//           </button>
//           <h1 className="font-semibold">{activeTab}</h1>
//         </div>

//         {renderContent()}
//       </main>

//     </div>
//   );
// };

// export default Profile;

// frontend/src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaTachometerAlt,
  FaUser,
  FaBox,
  FaWallet,
  FaMapMarkerAlt,
  FaHeart,
  FaHeadset,
  FaStore,
  FaSignOutAlt
} from "react-icons/fa";

// Tabs
import Dashboard from "./Merchant/Dashboard";
import MyProfile from "./Merchant/MyProfile";
import MyOrders from "./Merchant/MyOrders";
import MyWallet from "./Merchant/MyWallet";
import MyAddresses from "./Merchant/MyAddresses";
import Wishlist from "./Merchant/Wishlist";
import Support from "./Merchant/Support";


const BASE_URL = import.meta.env.VITE_API_BASE_URL; // This is likely 'http://localhost:5000/api'

const Profile = () => {
  const { user: authUser, logout, login } = useAuth(); // Get user and login/logout from AuthContext
  const [activeTab, setActiveTab] = useState("My Profile"); // Default to My Profile for clarity
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // State to hold the current user data, ideally from AuthContext
  const [currentUser, setCurrentUser] = useState(authUser);

  // Fetch user profile from backend on mount or when authUser/token changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        logout(); // Clear any stale data if token is missing
        navigate('/login');
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 404) { // Token invalid/expired or user not found
            logout();
            navigate('/login');
          }
          throw new Error(`Failed to fetch user profile: ${res.statusText}`);
        }
        const data = await res.json();
        // Update AuthContext with fresh data. AuthContext's `login` will also update localStorage.
        login({ user: data, token: token });
        setCurrentUser(data); // Set local state for rendering
      } catch (err) {
        console.error("Error fetching user profile:", err);
        logout(); // Logout on any profile fetch error
        navigate('/login');
      }
    };

    // If AuthContext already has a user, use it. Otherwise, fetch from backend.
    // This prevents unnecessary API calls if user data is already available and fresh.
    if (authUser && authUser.id) {
        setCurrentUser(authUser);
    } else {
        fetchUserProfile();
    }

    // Listener for 'user-updated' custom event (fired by MyProfile on successful save)
    // This ensures that `currentUser` state here is updated immediately without a full re-fetch
    const handleUserUpdated = (event) => {
        const updatedData = event.detail; // MyProfile will pass updated user data in event.detail
        if (updatedData) {
            setCurrentUser(updatedData);
            // Also ensure AuthContext is updated, though MyProfile's onUpdate should handle this
            login({ user: updatedData, token: localStorage.getItem('token') });
        }
    };
    window.addEventListener("user-updated", handleUserUpdated);
    return () => window.removeEventListener("user-updated", handleUserUpdated);

  }, [authUser, logout, login, navigate]); // Add authUser to dependency array

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleBackToStore = () => {
    navigate("/");
  };

  // Callback for when MyProfile updates the user via API successfully
  // This updates the global AuthContext state and then `currentUser` state here.
  const handleProfileUpdate = (updatedUserData) => {
    login({ user: updatedUserData, token: localStorage.getItem('token') }); // Ensure token is also passed
    setCurrentUser(updatedUserData);
  };

  if (!currentUser) return null; // Or show a loading indicator

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "My Profile", icon: <FaUser /> },
    { name: "My Orders", icon: <FaBox /> },
    { name: "My Wallet", icon: <FaWallet /> },
    { name: "My Addresses", icon: <FaMapMarkerAlt /> },
    { name: "Wishlist", icon: <FaHeart /> },
    { name: "Support", icon: <FaHeadset /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard user={currentUser} />;
      case "My Profile":
        // Pass currentUser and the update callback
        return <MyProfile user={currentUser} onUpdate={handleProfileUpdate} />;
      case "My Orders":
        return <MyOrders user={currentUser} />;
      case "My Wallet":
        return <MyWallet user={currentUser} />;
      case "My Addresses":
        return <MyAddresses user={currentUser} />;
      case "Wishlist":
        return <Wishlist user={currentUser} />;
      case "Support":
        return <Support user={currentUser} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 relative">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full w-64
        bg-black text-white flex flex-col
        mt-16 lg:mt-0
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >

        <div className="p-6 border-b border-orange-300 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">My Account</h2>
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center
            bg-white text-orange-600 rounded-full shadow"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="py-4 space-y-2 flex-1">

          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-6 py-3 ml-3 rounded-l-full cursor-pointer font-bold transition
              ${
                activeTab === item.name
                  ? "bg-white text-orange-600 font-semibold"
                  : "text-gray-300 hover:bg-yellow-500 hover:text-black"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="whitespace-nowrap">{item.name}</span>
            </div>
          ))}

          <div
            onClick={handleBackToStore}
            className="flex items-center gap-3 px-6 py-3 ml-3 mt-4 rounded-l-full cursor-pointer font-bold
            text-gray-300 hover:bg-blue-500 hover:text-white transition"
          >
            <span className="text-lg">
              <FaStore/>
            </span>
            <span>Back to Store</span>
          </div>

          <div
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 ml-3 mt-2 rounded-l-full cursor-pointer font-bold
            text-gray-300 hover:bg-red-600 hover:text-white transition"
          >
            <span className="text-lg">
              <FaSignOutAlt />
            </span>
            <span>Logout</span>
          </div>

        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-6 overflow-y-auto">

        <div className="lg:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl font-bold"
          >
            ☰
          </button>
          <h1 className="font-semibold">{activeTab}</h1>
        </div>

        {renderContent()}
      </main>

    </div>
  );
};

export default Profile;