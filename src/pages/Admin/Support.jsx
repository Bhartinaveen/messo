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
