// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

// const AdminSidebar = ({ selectedView = "dashboard", onSelect }) => {
//   const navigate = useNavigate();
//   const [openMobile, setOpenMobile] = useState(false);
//   const { logout, user } = useAuth();

//   const handleLogout = () => {
//     logout();
//     setOpenMobile(false);
//     navigate("/");
//   };

//   const handleClick = (view) => {
//     onSelect(view);
//     setOpenMobile(false);
//   };

//   const linkClass = (name) =>
//     `block w-full text-left px-4 py-3 rounded-lg font-medium transition ${
//       selectedView === name
//         ? "bg-white text-orange-600 font-semibold"
//         : "text-white hover:bg-white/20"
//     }`;

//   const isSuperAdmin = user?.role === "superadmin";

//   const Menu = () => (
//     <>
//       {/* Dashboard */}
//       <button onClick={() => handleClick("dashboard")} className={linkClass("dashboard")}>
//         {isSuperAdmin ? "Super Dashboard" : "Dashboard"}
//       </button>

//       {/* Superadmin Only */}
//       {isSuperAdmin && (
//         <>
//           <button onClick={() => handleClick("analytics")} className={linkClass("analytics")}>
//             Analytics
//           </button>

//           <button onClick={() => handleClick("security-logs")} className={linkClass("security-logs")}>
//             Security Logs
//           </button>

//           <button onClick={() => handleClick("settings")} className={linkClass("settings")}>
//             Settings
//           </button>

//           <button onClick={() => handleClick("admin-management")} className={linkClass("admin-management")}>
//               Admin Management
//             </button>
//         </>
//       )}

//       {/* Admin + SuperAdmin Common */}
//       <button onClick={() => handleClick("orders")} className={linkClass("orders")}>
//         Orders
//       </button>

//       <button onClick={() => handleClick("products")} className={linkClass("products")}>
//         Products
//       </button>

//       <button onClick={() => handleClick("users")} className={linkClass("users")}>
//         Users
//       </button>

    

//       {!isSuperAdmin && (
//         <>
//           <button onClick={() => handleClick("hero")} className={linkClass("hero")}>
//             Hero Manager
//           </button>

//           <button onClick={() => handleClick("partners")} className={linkClass("partners")}>
//             Delivery Partners
//           </button>
//         </>
//       )}

//       <button onClick={() => handleClick("profile")} className={linkClass("profile")}>
//         Profile
//       </button>

//       <button onClick={() => handleClick("support")} className={linkClass("support")}>
//         Support
//       </button>
//     </>
//   );

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <aside className="hidden md:flex md:flex-col w-64 min-h-screen bg-black text-white p-6">
//         <div className="mb-8 text-center">
//           <div className="w-16 h-16 mx-auto rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-lg">
//             {isSuperAdmin ? "SA" : "A"}
//           </div>
//           <p className="mt-3 font-semibold">
//             {isSuperAdmin ? "Super Admin Panel" : "Admin Panel"}
//           </p>
//         </div>

//         <nav className="space-y-2">
//           <Menu />

//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 w-full px-4 py-3 rounded-lg font-medium text-white hover:bg-white/20 transition"
//           >
//             <FaSignOutAlt />
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* Mobile Sidebar */}
//       <div className="md:hidden relative bg-black text-white p-4">
//         <div className="flex items-center justify-between">
//           <h2 className="font-semibold text-lg">
//             {isSuperAdmin ? "Super Admin" : "Admin Panel"}
//           </h2>

//           <button onClick={() => setOpenMobile(!openMobile)}>
//             {openMobile ? <FaTimes size={20} /> : <FaBars size={20} />}
//           </button>
//         </div>

//         {openMobile && (
//           <div className="absolute left-0 top-full w-full bg-black p-4 space-y-2 shadow-lg z-50">
//             <nav className="space-y-2">
//               <Menu />

//               <button
//                 onClick={handleLogout}
//                 className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg font-medium text-white hover:bg-white/20 transition mt-2"
//               >
//                 <FaSignOutAlt />
//                 Logout
//               </button>
//             </nav>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default AdminSidebar;

// frontend\src\components\AdminSidebar.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt, FaStore,  FaTachometerAlt,
  FaBox,
  FaUser,
  FaUsers,
  FaChartBar,
  FaCog,
  FaShieldAlt,
  FaUserShield,
  FaTruck,
  FaHeadset } from "react-icons/fa";

const AdminSidebar = ({ selectedView = "dashboard", onSelect }) => {
  const navigate = useNavigate();
  const [openMobile, setOpenMobile] = useState(false);
  const { logout, user } = useAuth(); // Use user from AuthContext

  const handleLogout = () => {
    logout();
    setOpenMobile(false);
    navigate("/");
  };

  const handleClick = (view) => {
    onSelect(view);
    setOpenMobile(false);
  };

  // Modified linkClass to match customer profile sidebar visually
  const linkClass = (name) =>
    `flex items-center gap-3 px-6 py-3 w-full cursor-pointer font-bold transition rounded-l-full whitespace-nowrap ${
      selectedView === name
        ? "bg-white text-orange-600 font-semibold"
        : "text-gray-300 hover:bg-yellow-500 hover:text-black " // Match customer sidebar hover
    }`;

  const isSuperAdmin = user?.role === "superadmin";
  const isAdmin = user?.role === "admin";

 const Menu = () => (
  <>
    <button onClick={() => handleClick("dashboard")} className={linkClass("dashboard")}>
      <FaTachometerAlt />
      {isSuperAdmin ? "Super Dashboard" : "Dashboard"}
    </button>

    {isSuperAdmin && (
      <>
        <button onClick={() => handleClick("partner-approvals")} className={linkClass("partner-approvals")}>
          <FaUserShield />
          Partner Approvals
        </button>

        <button onClick={() => handleClick("analytics")} className={linkClass("analytics")}>
          <FaChartBar />
          Analytics
        </button>

        <button onClick={() => handleClick("security-logs")} className={linkClass("security-logs")}>
          <FaShieldAlt />
          Security Logs
        </button>

        <button onClick={() => handleClick("settings")} className={linkClass("settings")}>
          <FaCog />
          Settings
        </button>

        <button onClick={() => handleClick("admin-management")} className={linkClass("admin-management")}>
          <FaUsers />
          Admin Management
        </button>
      </>
    )}

    {(isAdmin || isSuperAdmin) && (
      <>
        <button onClick={() => handleClick("orders")} className={linkClass("orders")}>
          <FaBox />
          Orders
        </button>

        <button onClick={() => handleClick("products")} className={linkClass("products")}>
          <FaStore />
          Products
        </button>
      </>
    )}

    {isSuperAdmin && (
      <>
        <button onClick={() => handleClick("users")} className={linkClass("users")}>
          <FaUsers />
          Users
        </button>

        <button onClick={() => handleClick("hero")} className={linkClass("hero")}>
          <FaTachometerAlt />
          Hero Manager
        </button>
      </>
    )}

    {isAdmin && !isSuperAdmin && (
      <button onClick={() => handleClick("partners")} className={linkClass("partners")}>
        <FaTruck />
        Delivery Partners
      </button>
    )}

    <button onClick={() => handleClick("profile")} className={linkClass("profile")}>
      <FaUser />
      Profile
    </button>

    <button onClick={() => handleClick("support")} className={linkClass("support")}>
      <FaHeadset />
      Support
    </button>
  </>
);

  return (
    <>
  
      <style>
      {`
      .sidebar-scroll::-webkit-scrollbar {
        width: 6px;
      }

      .sidebar-scroll::-webkit-scrollbar-thumb {
        background: #666;
        border-radius: 10px;
      }

      .sidebar-scroll::-webkit-scrollbar-track {
        background: transparent;
      }
      `}
      </style>


      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 h-screen bg-black text-white relative z-40"> {/* Changed padding for header */}
        
        {/* Header section - visually similar to customer profile sidebar's header */}
        <div className="p-6 border-b border-orange-300"> {/* MODIFIED: Added p-6 and border-orange-300 */}
          <h2 className="text-2xl font-bold text-white">
            {isSuperAdmin ? "Super Admin Panel" : isAdmin ? "Admin Panel" : "Admin Panel"}
          </h2>
        </div>

        <nav className="py-4 space-y-2 flex-1 overflow-y-auto sidebar-scroll">
          <Menu />

          {/* Back to Store link, matching style of other menu items */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-6 py-3 w-full font-bold 
            text-gray-300 hover:bg-blue-500 hover:text-white transition" // MODIFIED: Hover color for distinction
          >
            <FaStore />
            Back to Store
          </button>

          {/* Logout button, matching style of other menu items */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 w-full font-bold
            text-gray-300 hover:bg-red-600 hover:text-white transition" // MODIFIED: Hover color for distinction
          >
            <FaSignOutAlt />
            Logout
          </button>
        </nav>
      </aside>

     
      {/* Mobile Sidebar */}
      <div className="md:hidden">

        {/* Top Bar */}
        <div className="md:hidden flex items-center justify-between p-4 text-black">
          <button
            onClick={() => setOpenMobile(true)}
            className="text-2xl font-bold"
          >
            <FaBars />
          </button>

          <h1 className="font-semibold">
            {isSuperAdmin ? "Super Admin Panel" : "Admin Panel"}
          </h1>
        </div>

        {/* Overlay */}
        {openMobile && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpenMobile(false)}
          />
        )}

        {/* Sliding Sidebar */}
        <aside
            className={`fixed md:static top-0 left-0 h-full w-64 bg-black text-white
            transform transition-transform duration-300 z-50
            ${openMobile ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0`}
          >

          {/* Header */}
          <div className="p-6 border-b border-orange-300 flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {isSuperAdmin ? "Super Admin Panel" : "Admin Panel"}
            </h2>

            <button
              onClick={() => setOpenMobile(false)}
              className="bg-white text-orange-600 w-8 h-8 rounded-full flex items-center justify-center"
            >
              <FaTimes />
            </button>
          </div>

          {/* Menu */}
          <nav className="py-4 space-y-2 h-[calc(100vh-80px)] overflow-y-auto sidebar-scroll pb-24">
            <Menu />

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 px-6 py-3 w-full font-bold
              text-gray-300 hover:bg-blue-500 hover:text-white transition"
            >
              <FaStore />
              Back to Store
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-6 py-3 w-full font-bold
              text-gray-300 hover:bg-red-600 hover:text-white transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </nav>

        </aside>

      </div>
    </>
  );
};



export default AdminSidebar;
