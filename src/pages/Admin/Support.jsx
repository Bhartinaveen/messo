import { useEffect, useState } from "react";

const statusColor = {
  Open: "bg-blue-100 text-blue-700",
  Escalated: "bg-yellow-100 text-yellow-700",
  Closed: "bg-green-100 text-green-700",
};

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("supportTickets")) || [];
    setTickets(data);
  }, []);

  const updateTicket = (id, updates) => {
    const updated = tickets.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    localStorage.setItem("supportTickets", JSON.stringify(updated));
    setTickets(updated);
  };

  const filteredTickets = tickets.filter(
    (t) =>
      t.subject?.toLowerCase().includes(search.toLowerCase()) ||
      t.message?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Support Tickets
        </h2>

        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-lg text-sm w-full sm:w-64"
        />
      </div>

      {filteredTickets.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No support tickets found
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border rounded-lg overflow-hidden">

              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3 text-left">Message</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTickets.map((t) => (
                  <tr key={t.id} className="border-t hover:bg-gray-50">

                    <td className="p-3 font-medium">{t.subject}</td>

                    <td className="p-3 text-sm text-gray-600 max-w-xs truncate">
                      {t.message}
                    </td>

                    <td className="p-3 text-sm text-gray-600">
                      {t.user || "Customer"}
                    </td>

                    <td className="p-3 text-sm text-gray-500">
                      {t.date || "—"}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          statusColor[t.status] || "bg-gray-100"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2 flex-wrap">
                      {t.status !== "Closed" && (
                        <>
                          <button
                            onClick={() =>
                              updateTicket(t.id, {
                                status: "Closed",
                                resolvedBy: "Admin",
                              })
                            }
                            className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                          >
                            Resolve
                          </button>

                          <button
                            onClick={() =>
                              updateTicket(t.id, { status: "Escalated" })
                            }
                            className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                          >
                            Escalate
                          </button>
                        </>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredTickets.map((t) => (
              <div
                key={t.id}
                className="border rounded-xl p-4 shadow-sm flex flex-col gap-2"
              >

                <div className="font-semibold text-gray-800">
                  {t.subject}
                </div>

                <div className="text-sm text-gray-600">
                  {t.message}
                </div>

                <div className="text-xs text-gray-500">
                  User: {t.user || "Customer"}
                </div>

                <div className="text-xs text-gray-500">
                  Date: {t.date || "—"}
                </div>

                <span
                  className={`w-fit px-3 py-1 text-xs rounded-full ${
                    statusColor[t.status] || "bg-gray-100"
                  }`}
                >
                  {t.status}
                </span>

                {t.status !== "Closed" && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateTicket(t.id, {
                          status: "Closed",
                          resolvedBy: "Admin",
                        })
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Resolve
                    </button>

                    <button
                      onClick={() =>
                        updateTicket(t.id, { status: "Escalated" })
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Escalate
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Support;