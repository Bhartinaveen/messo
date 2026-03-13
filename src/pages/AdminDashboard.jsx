// FirstUShop/src/pages/AdminDashboard.jsx (MODIFIED)
import React, { useEffect, useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import Dashboard from "./Admin/Dashboard";
import Products from "./Admin/Products";
import AdminOrders from "./Admin/Orders";
import Users from "./Admin/User";
import Profile from "./Admin/Profile";
import Support from "./Admin/Support";
import AdminManagement from "./SuperAdmin/AdminManagement";
import SuperDashboard from "./SuperAdmin/SuperDashboard";
import Settings from "./SuperAdmin/Settings";
import SecurityLogs from "./SuperAdmin/SecurityLogs";
import Analytics from "./SuperAdmin/Analytics";
import SuperUsers from "./SuperAdmin/User";
import PartnerApprovals from "./SuperAdmin/PartnerApprovals"; 
import HeroManager from "./SuperAdmin/HeroManager";
import DeliveryPartners from "./Admin/DeliveryPartners";
import { useNavigate } from "react-router-dom";
import {
  getProductsForUser,
} from "../utils/productStorage";
import { getDeliveryPartners } from "../utils/deliveryStorage";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [partners, setPartners] = useState([]); // This is for local storage 'Delivery Partners'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("dashboard");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUser = JSON.parse(localStorage.getItem("user")); // Use a distinct variable name

    if (!token || !currentUser || !currentUser.isAdmin) {
      navigate("/login");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const fetchAdminData = async () => {
      setLoading(true);
      try {
        // Fetch users, orders, products if current user is superadmin or a regular admin (partner)
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          fetch(`${BASE_URL}/users`, { headers }),
          fetch(`${BASE_URL}/orders`, { headers }),
          fetch(`${BASE_URL}/products`, { headers }),
        ]);

        const usersData = await usersRes.json();
        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();

        setUsers(Array.isArray(usersData) ? usersData : []);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setProducts(Array.isArray(productsData) ? productsData : []);

        const localPartners = getDeliveryPartners();
        setPartners(Array.isArray(localPartners) ? localPartners : []);
      } catch (err) {
        setError("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading Admin Dashboard...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );

    

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row min-h-screen">

        {/* Sidebar */}
       
          <AdminSidebar selectedView={view} onSelect={setView} />
        

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6">

        

          {/* Dashboard View */}
          {view === "dashboard" && user?.role !== "superadmin" && (
            <Dashboard onNavigate={setView} />
          )}

          {view === "dashboard" && user?.role === "superadmin" && (
            <SuperDashboard onNavigate={setView} />
          )}

          {view === "analytics" && (
            <SectionWrapper>
              <Analytics />
            </SectionWrapper>
          )}

          {/* NEW: Partner Approvals section for SuperAdmin */}
          {view === "partner-approvals" && user?.role === "superadmin" && (
            <SectionWrapper>
              <PartnerApprovals />
            </SectionWrapper>
          )}

          {view === "orders" && (
            <SectionWrapper>
              <AdminOrders />
            </SectionWrapper>
          )}

          {view === "users" && (
            <SectionWrapper>
              {user?.role === "superadmin" ? <SuperUsers /> : <Users />}
            </SectionWrapper>
          )}

          {view === "products" && (
            <SectionWrapper>
              <Products />
            </SectionWrapper>
          )}

        {view === "hero" && user?.role !== "admin" && (
            <SectionWrapper>
              <HeroManager />
            </SectionWrapper>
          )}

          {view === "profile" && (
            <SectionWrapper>
              <Profile user={user} />
            </SectionWrapper>
          )}

          {view === "support" && (
            <SectionWrapper>
              <Support />
              </SectionWrapper>
              )}

        
            {view === "partners" && user?.role !== "superadmin" && (
              <SectionWrapper>
                <DeliveryPartners />
              </SectionWrapper>
            )}

            

          {view === "settings" && user?.role === "superadmin" && (
            <SectionWrapper>
              <Settings />
            </SectionWrapper>
          )}

          {view === "security-logs" && user?.role === "superadmin" && (
            <SectionWrapper>
              <SecurityLogs />
            </SectionWrapper>
          )}

          {view === "admin-management" && user?.role === "superadmin" && (
            <SectionWrapper>
              <AdminManagement />
            </SectionWrapper>
          )}

        </main>
      </div>
    </div>
  );
};

/* Reusable Components */

const StatCard = ({ title, value, color }) => (
  <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">
    <p className="text-sm text-gray-500">{title}</p>
    <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
  </div>
);

const SectionWrapper = ({ children }) => (
  <section className="bg-white rounded-2xl shadow-sm border p-5 sm:p-6">
    {children}
  </section>
);

export default AdminDashboard;