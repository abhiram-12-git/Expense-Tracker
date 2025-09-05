import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext.jsx";

const TransactionList = ({ transactions = [], onDelete }) => {
  const { searchText } = useContext(SearchContext); // 🔥 use Navbar search

  if (transactions.length === 0) {
    return <p className="text-gray-500 mt-4">No transactions found.</p>;
  }

  // Highlight matching text
  const highlightText = (text) => {
    if (!searchText) return text;
    const regex = new RegExp(`(${searchText})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="mt-8 w-full">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">History</h3>
      <ul className="space-y-3">
        {transactions.map((t) => (
          <li
            key={t._id}
            className={`flex items-center justify-between bg-white shadow-md rounded-xl p-4 border-l-4 transition ${
              t.amount < 0
                ? "border-red-400 hover:border-red-500"
                : "border-green-400 hover:border-green-500"
            }`}
          >
            {/* Transaction Text with highlight */}
            <span className="font-medium text-gray-700 truncate">
              {highlightText(t.text || "No description")}
            </span>

            {/* Amount */}
            <span
              className={`font-bold ${
                t.amount < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount || 0)}
            </span>

            {/* Delete Button */}
            <button
              onClick={() => t._id && onDelete(t._id)}
              className="ml-4 bg-red-100 hover:bg-red-200 text-red-600 font-bold rounded-full px-3 py-1 transition"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
