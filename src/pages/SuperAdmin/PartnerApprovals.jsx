// FirstUShop/src/pages/SuperAdmin/PartnerApprovals.jsx (NEW FILE)
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Assuming useAuth for token
import { CheckCircle, XCircle } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PartnerApprovals = () => {
  const { token } = useAuth();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchPartners = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/super-admin/partners?status=all`, { // Fetch all partners, filter in UI
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch partners');
      }
      // Filter for 'admin' role (partners) and exclude 'superadmin' itself
      const filtered = (data.items || []).filter(p => p.role === 'admin');
      setPartners(filtered);
    } catch (err) {
      console.error("Error fetching partners:", err);
      setError(err.message || 'Failed to load partners.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [token]);

  const handleApproval = async (partnerId, approve) => {
    if (!window.confirm(`Are you sure you want to ${approve ? 'approve' : 'disapprove'} this partner?`)) return;

    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`${BASE_URL}/super-admin/partners/${partnerId}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isApproved: approve })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || `Failed to ${approve ? 'approve' : 'disapprove'} partner`);
      }
      setMessage(`Partner ${data.user.name} ${approve ? 'approved' : 'disapproved'} successfully!`);
      fetchPartners(); // Re-fetch to update list
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error("Error updating approval status:", err);
      setError(err.message || 'Failed to update partner approval status.');
    } finally {
      setLoading(false);
    }
  };

  const pendingPartners = partners.filter(p => !p.isApproved);
  const approvedPartners = partners.filter(p => p.isApproved);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Partner Approvals</h2>
      <p className="text-gray-600">Manage registrations for merchants and sellers.</p>

      {message && <div className="p-3 bg-green-100 text-green-700 rounded-lg">{message}</div>}
      {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

      {loading ? (
        <p>Loading partners...</p>
      ) : (
        <>
          {/* Pending Partners */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <XCircle className="text-red-500" /> Pending Approvals ({pendingPartners.length})
            </h3>
            {pendingPartners.length === 0 ? (
              <p className="text-gray-500">No pending partner registrations.</p>
            ) : (
              <div className="space-y-4">
                {pendingPartners.map(p => (
                  <div key={p.id} className="border p-4 rounded-lg bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <p className="font-semibold">{p.name} <span className="text-sm text-gray-500">({p.email})</span></p>
                      <p className="text-sm text-gray-600">Store: {p.storeName || 'N/A'}</p>
                      <p className="text-xs text-gray-400">Registered: {new Date(p.createdAt).toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={() => handleApproval(p.id, true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      disabled={loading}
                    >
                      <CheckCircle size={16} className="inline mr-2"/> Approve
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Approved Partners */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-500" /> Approved Partners ({approvedPartners.length})
            </h3>
            {approvedPartners.length === 0 ? (
              <p className="text-gray-500">No approved partners.</p>
            ) : (
              <div className="space-y-4">
                {approvedPartners.map(p => (
                  <div key={p.id} className="border p-4 rounded-lg bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <p className="font-semibold">{p.name} <span className="text-sm text-gray-500">({p.email})</span></p>
                      <p className="text-sm text-gray-600">Store: {p.storeName || 'N/A'}</p>
                      <p className="text-xs text-gray-400">Approved: {new Date(p.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={() => handleApproval(p.id, false)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      disabled={loading}
                    >
                       <XCircle size={16} className="inline mr-2"/> Disapprove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PartnerApprovals;