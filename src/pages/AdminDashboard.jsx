import React, { useEffect, useState } from "react";
import AdminHeroManager from "../components/AdminHeroManager";
import AdminSidebar from "../components/AdminSidebar";
import AdminProducts from "./Admin/Products";
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
import { useNavigate } from "react-router-dom";
import {
  getProductsForUser,
} from "../utils/productStorage";
import {
  getDeliveryPartners,
  saveDeliveryPartner,
  updateDeliveryPartner,
} from "../utils/deliveryStorage";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("dashboard");
  const [newPartnerName, setNewPartnerName] = useState("");
  const [newPartnerMobile, setNewPartnerMobile] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user || !user.isAdmin) {
      navigate("/login");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const fetchAdminData = async () => {
      setLoading(true);
      try {
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          fetch("/api/users", { headers }),
          fetch("/api/orders", { headers }),
          fetch("/api/products", { headers }),
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

          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back, {user?.name || "Admin"}
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Go to Website
            </button>
          </div>

          {/* Dashboard View */}
          {view === "dashboard" && user?.role !== "superadmin" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard title="Total Users" value={users.length} color="text-indigo-600" />
              <StatCard title="Total Orders" value={orders.length} color="text-green-600" />
              <StatCard
                title="Revenue"
                value={`₹${orders
                  .filter((o) => o.isPaid)
                  .reduce((sum, o) => sum + Number(o.totalPrice || 0), 0)}`}
                color="text-pink-600"
              />
            </div>
          )}

          {view === "dashboard" && user?.role === "superadmin" && (
            <SuperDashboard onNavigate={setView} />
          )}

          {view === "analytics" && (
            <section className="bg-white  rounded-2xl shadow-sm border p-6">
              {user?.role === "superadmin" ? (
                <Analytics />
              ) : (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Admin Analytics</h2>
                  <p className="text-gray-500">Charts coming soon...</p>
                </div>
              )}
            </section>
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
              <AdminProducts />
            </SectionWrapper>
          )}

          {view === "hero" && (
            <SectionWrapper>
              <AdminHeroManager />
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

          {view === "partners" && (
            <SectionWrapper>
              <h2 className="text-xl font-semibold mb-6">
                Delivery Partners Management
              </h2>

              {/* Issue Partner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <input
                  value={newPartnerName}
                  onChange={(e) => setNewPartnerName(e.target.value)}
                  placeholder="Partner Name"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  value={newPartnerMobile}
                  onChange={(e) => setNewPartnerMobile(e.target.value)}
                  placeholder="Mobile Number"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button
                  onClick={() => {
                    if (!newPartnerName || !newPartnerMobile) return;
                    const partner = {
                      name: newPartnerName,
                      mobile: newPartnerMobile,
                      uniqueId: `DP-${Date.now()}`,
                      status: "Active",
                      joinedDate: new Date().toISOString(),
                    };
                    saveDeliveryPartner(partner);
                    setPartners([partner, ...partners]);
                    setNewPartnerName("");
                    setNewPartnerMobile("");
                  }}
                  className="bg-pink-500 text-white rounded-lg px-4 py-2"
                >
                  Generate ID
                </button>
              </div>

              {/* Partners Table */}
              <div className="overflow-x-auto border rounded-xl">
                <table className="min-w-[700px] w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">ID</th>
                      <th className="py-3 px-4 text-left">Mobile</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partners.map((p) => (
                      <tr key={p.uniqueId} className="border-t">
                        <td className="py-3 px-4">{p.name}</td>
                        <td className="py-3 px-4">{p.uniqueId}</td>
                        <td className="py-3 px-4">{p.mobile}</td>
                        <td className="py-3 px-4">{p.status}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => {
                              const updated = updateDeliveryPartner(p.uniqueId, {
                                status: "Terminated",
                              });
                              setPartners(updated);
                            }}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Terminate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
