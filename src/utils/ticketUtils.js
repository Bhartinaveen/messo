export const STATUSES = [
  "Raised",
  "In Progress",
  "Escalated",
  "Resolved",
  "Closed",
];

export const statusColor = (status) => {
  switch (status) {
    case "Raised":
      return "bg-gray-100 text-gray-600";
    case "In Progress":
      return "bg-blue-100 text-blue-600";
    case "Escalated":
      return "bg-red-100 text-red-600";
    case "Resolved":
      return "bg-green-100 text-green-600";
    case "Closed":
      return "bg-black text-white";
    default:
      return "bg-gray-100";
  }
};
