
const variants = {

  published:  "bg-green-100 text-green-800",
  draft:      "bg-yellow-100 text-yellow-800",
  archived:   "bg-gray-100 text-gray-800",


  pending:    "bg-yellow-100 text-yellow-800",
  confirmed:  "bg-blue-100 text-blue-800",
  shipped:    "bg-indigo-100 text-indigo-800",
  delivered:  "bg-green-100 text-green-800",
  cancelled:  "bg-red-100 text-red-800",


  paid:       "bg-green-100 text-green-800",
  unpaid:     "bg-red-100 text-red-800",


  admin:      "bg-purple-100 text-purple-800",
  customer:   "bg-blue-100 text-blue-800",
  active:     "bg-green-100 text-green-800",
  banned:     "bg-red-100 text-red-800",


  true:       "bg-green-100 text-green-800",
  false:      "bg-red-100 text-red-800",
};

const StatusBadge = ({ value, label }) => {
  const key = String(value).toLowerCase();
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize 
        ${variants[key] || "bg-gray-100 text-gray-800"}`}
    >
      {label || value}
    </span>
  );
};

export default StatusBadge;