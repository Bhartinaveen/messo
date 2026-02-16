import { useEffect, useState } from "react";

const Support = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("supportTickets")) || [];
    setTickets(data.filter(t => t.status === "Escalated"));
  }, []);

  const resolve = (id) => {
    const all = JSON.parse(localStorage.getItem("supportTickets")) || [];
    const updated = all.map(t =>
      t.id === id
        ? { ...t, status: "Closed", resolvedBy: "SuperAdmin" }
        : t
    );
    localStorage.setItem("supportTickets", JSON.stringify(updated));
    setTickets(updated.filter(t => t.status === "Escalated"));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Escalated Tickets</h2>

      {tickets.map(t => (
        <div key={t.id} className="border p-4 rounded-lg mb-4">
          <b>{t.subject}</b>
          <p className="text-sm">{t.message}</p>

          <button
            onClick={() => resolve(t.id)}
            className="bg-indigo-600 text-white px-3 py-1 rounded mt-3"
          >
            Resolve
          </button>
        </div>
      ))}
    </div>
  );
};

export default Support;
