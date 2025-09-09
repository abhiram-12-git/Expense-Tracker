import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContextBase.jsx";
import { BalanceContext } from "../context/BalanceContext.jsx";
import { SearchContext } from "../context/SearchContext.jsx";
import TransactionList from "../components/TransactionList.jsx";
import Message from "../components/Message.jsx";

const AllTransactionsPage = () => {
  const { token } = useContext(AuthContext) || {};
  const { 
    transactions = [], 
    fetchTransactions, 
    deleteTransaction 
  } = useContext(BalanceContext) || {};
  const { searchText } = useContext(SearchContext) || {};
  const [message, setMessage] = useState({ type: "", text: "" });

  // Filter transactions by search
  const getFilteredTransactions = () => {
    if (!searchText) return transactions;
    return transactions.filter((t) =>
      t.text?.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  // Handle delete transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      setMessage({ type: "success", text: "Transaction deleted successfully!" });
    } catch (err) {
      console.error("Delete transaction error:", err);
      setMessage({ type: "error", text: "Failed to delete transaction" });
    }
  };

  // Auto clear messages
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Fetch transactions on mount
  useEffect(() => {
    if (token && typeof fetchTransactions === "function") {
      try {
        fetchTransactions();
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setMessage({ type: "error", text: "Failed to fetch transactions" });
      }
    }
  }, [token, fetchTransactions]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-600 text-center mb-6 sm:mb-8">
          All Transactions
        </h2>

        {/* Messages */}
        {message.text && (
          <div className="mb-4 sm:mb-6">
            <Message type={message.type} text={message.text} />
          </div>
        )}

        {/* Transaction List */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
            Transaction History
          </h3>
          <TransactionList
            transactions={getFilteredTransactions() || []}
            onDelete={handleDeleteTransaction}
          />
        </div>
      </div>
    </div>
  );
};

export default AllTransactionsPage;
