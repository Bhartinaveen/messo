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
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

const AdminSidebar = ({ selectedView = "dashboard", onSelect }) => {
  const navigate = useNavigate();
  const [openMobile, setOpenMobile] = useState(false);
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    setOpenMobile(false);
    navigate("/");
  };

  const handleClick = (view) => {
    onSelect(view);
    setOpenMobile(false);
  };

  const linkClass = (name) =>
    `block w-full text-left px-4 py-3 rounded-lg font-medium transition ${
      selectedView === name
        ? "bg-white text-orange-600 font-semibold"
        : "text-white hover:bg-white/20"
    }`;

  const isSuperAdmin = user?.role === "superadmin";

  const Menu = () => (
    <>
      {/* Dashboard */}
      <button onClick={() => handleClick("dashboard")} className={linkClass("dashboard")}>
        {isSuperAdmin ? "Super Dashboard" : "Dashboard"}
      </button>

      {/* Superadmin Only */}
      {isSuperAdmin && (
        <>
          <button onClick={() => handleClick("analytics")} className={linkClass("analytics")}>
            Analytics
          </button>

          <button onClick={() => handleClick("security-logs")} className={linkClass("security-logs")}>
            Security Logs
          </button>

          <button onClick={() => handleClick("settings")} className={linkClass("settings")}>
            Settings
          </button>

          <button onClick={() => handleClick("admin-management")} className={linkClass("admin-management")}>
              Admin Management
            </button>

          {/* NEW: Partners Management for SuperAdmin */}
          <button onClick={() => handleClick("partners")} className={linkClass("partners")}>
            Partners Management
          </button>
        </>
      )}

      {/* Admin + SuperAdmin Common */}
      <button onClick={() => handleClick("orders")} className={linkClass("orders")}>
        Orders
      </button>

      <button onClick={() => handleClick("products")} className={linkClass("products")}>
        Products
      </button>

      <button onClick={() => handleClick("users")} className={linkClass("users")}>
        Users
      </button>

      {/* Regular Admin Only */}
      {!isSuperAdmin && (
        <>
          <button onClick={() => handleClick("hero")} className={linkClass("hero")}>
            Hero Manager
          </button>

          {/* Removed: Partners was here, but now it's a SuperAdmin feature only */}
          {/* <button onClick={() => handleClick("partners")} className={linkClass("partners")}>
            Delivery Partners
          </button> */}
        </>
      )}

      <button onClick={() => handleClick("profile")} className={linkClass("profile")}>
        Profile
      </button>

      <button onClick={() => handleClick("support")} className={linkClass("support")}>
        Support
      </button>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 min-h-screen bg-black text-white p-6">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-lg">
            {isSuperAdmin ? "SA" : "A"}
          </div>
          <p className="mt-3 font-semibold">
            {isSuperAdmin ? "Super Admin Panel" : "Admin Panel"}
          </p>
        </div>

        <nav className="space-y-2">
          <Menu />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-3 rounded-lg font-medium text-white hover:bg-white/20 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden relative bg-black text-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">
            {isSuperAdmin ? "Super Admin" : "Admin Panel"}
          </h2>

          <button onClick={() => setOpenMobile(!openMobile)}>
            {openMobile ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {openMobile && (
          <div className="absolute left-0 top-full w-full bg-black p-4 space-y-2 shadow-lg z-50">
            <nav className="space-y-2">
              <Menu />

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg font-medium text-white hover:bg-white/20 transition mt-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminSidebar;