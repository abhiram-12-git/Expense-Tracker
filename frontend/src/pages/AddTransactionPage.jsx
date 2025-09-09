import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextBase.jsx"; 
import { BalanceContext } from "../context/BalanceContext.jsx";
import AddTransaction from "../components/AddTransaction.jsx";
import Message from "../components/Message.jsx";

const AddTransactionPage = () => {
  const { addTransaction } = useContext(BalanceContext) || {};
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleAddTransaction = async (transaction) => {
    try {
      await addTransaction(transaction);
      setMessage({ type: "success", text: "Transaction added successfully!" });
    } catch (err) {
      console.error("Add transaction error:", err);
      setMessage({
        type: "error",
        text: err.message || "Failed to add transaction",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {message.text && (
          <div className="mb-4">
            <Message type={message.type} text={message.text} />
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Transaction
        </h2>

        <AddTransaction onAdd={handleAddTransaction} />
      </div>
    </div>
  );
};

export default AddTransactionPage;
