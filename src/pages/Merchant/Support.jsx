import { useEffect, useState } from "react";
import { LifeBuoy } from "lucide-react";

const statusColor = {
  Raised: "bg-blue-100 text-blue-700",
  Escalated: "bg-yellow-100 text-yellow-700",
  Closed: "bg-green-100 text-green-700"
};

const priorityColor = {
  Low: "text-green-600",
  Medium: "text-yellow-600",
  High: "text-red-600"
};

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    priority: "",
    reference: "",
    message: ""
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("supportTickets")) || [];
    setTickets(data);
  }, []);

  const submitTicket = () => {
    if (!Object.values(form).every(v => v.trim())) {
      alert("Please fill all fields");
      return;
    }

    const newTicket = {
      id: Date.now(),
      ...form,
      status: "Raised",
      adminReply: "",
      resolvedBy: null,
      createdAt: new Date().toISOString()
    };

    const updated = [newTicket, ...tickets];
    localStorage.setItem("supportTickets", JSON.stringify(updated));
    setTickets(updated);

    setForm({
      subject: "",
      priority: "",
      reference: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <LifeBuoy className="text-orange-500" size={28} />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Customer Support
          </h2>
        </div>

        {/* Raise Ticket */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 space-y-4">

          <h3 className="font-semibold text-gray-700 text-lg">
            Raise Support Ticket
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <select
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Issue Type</option>
              <option>Payment Issue</option>
              <option>Order Issue</option>
              <option>Delivery Issue</option>
              <option>Account Issue</option>
              <option>Other</option>
            </select>

            <select
              value={form.priority}
              onChange={e => setForm({ ...form, priority: e.target.value })}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <input
            value={form.reference}
            onChange={e => setForm({ ...form, reference: e.target.value })}
            placeholder="Order / Reference ID"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
          />

          <textarea
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            placeholder="Describe your issue clearly"
            rows="4"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
          />

          <div className="flex justify-end">
            <button
              onClick={submitTicket}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
            >
              Submit Ticket
            </button>
          </div>

        </div>

        {/* Ticket List */}

        <div className="space-y-4 max-h-[450px] overflow-y-auto">

          {tickets.length === 0 && (
            <div className="text-center text-gray-500 text-sm bg-white p-6 rounded-xl">
              No support tickets yet
            </div>
          )}

          {tickets.map(t => (
            <div
              key={t.id}
              className="bg-white border rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm hover:shadow-md transition"
            >

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

                <div>
                  <p className="font-semibold text-gray-800">{t.subject}</p>

                  <p className="text-xs text-gray-500">
                    Ref: {t.reference}
                  </p>

                  <p className={`text-xs font-medium ${priorityColor[t.priority]}`}>
                    Priority: {t.priority}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full w-fit ${statusColor[t.status]}`}
                >
                  {t.status}
                </span>

              </div>

              <p className="text-sm text-gray-700">
                {t.message}
              </p>

              {/* Status Messages */}

              {t.status === "Escalated" && (
                <p className="text-xs text-orange-600">
                  Your ticket has been escalated for faster resolution
                </p>
              )}

              {t.status === "Closed" && (
                <p className="text-xs text-green-600">
                  Issue resolved successfully ✅
                </p>
              )}

              {/* Timeline */}

              <div className="flex flex-wrap gap-2 pt-2 text-xs">

                {["Raised", "Escalated", "Closed"].map(step => (
                  <div
                    key={step}
                    className={`px-2 py-1 rounded ${
                      t.status === step ||
                      (step === "Raised" && t.status !== "Raised")
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                ))}

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Support;