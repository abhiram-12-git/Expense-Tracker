import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { BalanceContext } from "../context/BalanceContext.jsx";
import { SearchContext } from "../context/SearchContext.jsx";

import Balance from "../components/Balance.jsx";
import IncomeExpense from "../components/IncomeExpense.jsx";
import TransactionList from "../components/TransactionList.jsx";
import AddTransaction from "../components/AddTransaction.jsx";
import Message from "../components/Message.jsx";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const { searchText } = useContext(SearchContext);
  const {
    transactions,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
  } = useContext(BalanceContext);

  const [message, setMessage] = useState({ type: "", text: "" });

  // 🔍 Filter transactions by search
  const getFilteredTransactions = () => {
    if (!searchText) return transactions;
    return transactions.filter((t) =>
      t.text.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  // ➕ Add Transaction
  const handleAddTransaction = async (transaction) => {
    try {
      await addTransaction(transaction);
      setMessage({ type: "success", text: "Transaction added successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to add transaction" });
    }
  };

  // ❌ Delete Transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      setMessage({ type: "success", text: "Transaction deleted successfully!" });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete transaction" });
    }
  };

  // 🕒 Auto clear messages
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // 🔄 Fetch transactions on mount
  useEffect(() => {
    if (token) fetchTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-600 text-center mb-6 sm:mb-8">
          Dashboard
        </h2>

        {/* Messages */}
        {message.text && (
          <div className="mb-4 sm:mb-6">
            <Message type={message.type} text={message.text} />
          </div>
        )}

        {/* Balance & Income/Expense */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              Balance
            </h3>
            <Balance transactions={transactions} />
          </div>

          <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              Income & Expenses
            </h3>
            <IncomeExpense transactions={transactions} />
          </div>
        </div>

        {/* Transaction List (Filtered) */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
            Transactions
          </h3>
          <TransactionList
            transactions={getFilteredTransactions()}
            onDelete={handleDeleteTransaction}
          />
        </div>

        {/* Add Transaction */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
            Add New Transaction
          </h3>
          <AddTransaction onAdd={handleAddTransaction} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
