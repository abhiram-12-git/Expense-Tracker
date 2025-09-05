import React, { useState, useEffect } from 'react';
import TransactionList from '../components/TransactionList';
import axios from 'axios';
import Message from '../components/Message';

const TransactionList1 = () => {
  const API_URL = "https://expense-tracker-abhi.onrender.com";
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch transactions on mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(API_URL, {
          headers: { "x-auth-token": token },
        });
        setTransactions(res.data);
      } catch {
        setMessage({ type: "error", text: "Failed to fetch transactions" });
      }
    };
    fetchTransactions();
  }, []);

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { "x-auth-token": token },
      });
      setTransactions(transactions.filter((t) => t._id !== id));
      setMessage({ type: "success", text: "Transaction deleted successfully!" });
    } catch {
      setMessage({ type: "error", text: "Failed to delete transaction" });
    }
  };

  // Filter transactions based on search
  const getFilteredTransactions = () => {
    if (!searchText) return transactions;
    return transactions.filter((t) =>
      t.text.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Message */}
      {message.text && <Message type={message.type} text={message.text} />}

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Transaction List</h1>

      {/* Search Box */}
      <div className="mb-6 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
      </div>

      {/* Transaction List */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4">
        <TransactionList
          transactions={getFilteredTransactions()}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  );
};

export default TransactionList1;
