// import React, { useEffect, useState } from 'react';

// const Support = () => {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem('token');

//   const fetchTickets = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch('/api/support', { headers: { Authorization: token ? `Bearer ${token}` : '' } });
//       const data = await res.json();
//       setTickets(data || []);
//     } finally { setLoading(false); }
//   };

//   useEffect(() => { fetchTickets(); }, []);

//   const respond = async (id) => {
//     const response = prompt('Enter your response');
//     if (!response) return;
//     try {
//       const res = await fetch(`/api/support/${id}/respond`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' }, body: JSON.stringify({ response, status: 'Closed' }) });
//       if (!res.ok) throw new Error('Respond failed');
//       fetchTickets();
//     } catch (err) { alert(err.message || 'Respond failed'); }
//   };

//   return (
//     <div className="bg-white shadow rounded-xl p-6">
//       <h2 className="text-xl font-semibold mb-4">Support Tickets</h2>
//       {loading ? <p>Loading...</p> : tickets.length === 0 ? <p className="text-gray-500">No tickets</p> : (
//         <ul className="space-y-3">
//           {tickets.map(t => (
//             <li key={t.id} className="border p-3 rounded">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <div className="font-semibold">{t.subject}</div>
//                   <div className="text-sm text-gray-500">From: {t.User?.name || t.userId}</div>
//                   <div className="mt-2">{t.message}</div>
//                   {t.response && <div className="mt-2 text-sm text-green-700">Response: {t.response}</div>}
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <div className="text-sm px-2 py-1 rounded bg-gray-100">{t.status}</div>
//                   <button onClick={() => respond(t.id)} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">Respond</button>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Support;

import { useEffect, useState } from "react";

const Support = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("supportTickets")) || [];
    setTickets(data);
  }, []);

  const updateTicket = (id, updates) => {
    const updated = tickets.map(t =>
      t.id === id ? { ...t, ...updates } : t
    );
    localStorage.setItem("supportTickets", JSON.stringify(updated));
    setTickets(updated);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Admin Support</h2>

      {tickets.map(t => (
        <div key={t.id} className="border p-4 rounded-lg mb-4">
          <b>{t.subject}</b>
          <p className="text-sm">{t.message}</p>
          <p className="text-xs">Status: {t.status}</p>

          {t.status !== "Closed" && (
            <div className="flex gap-3 mt-3">
              <button
                onClick={() =>
                  updateTicket(t.id, {
                    status: "Closed",
                    resolvedBy: "Admin"
                  })
                }
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Resolve
              </button>

              <button
                onClick={() =>
                  updateTicket(t.id, { status: "Escalated" })
                }
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Escalate
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Support;
