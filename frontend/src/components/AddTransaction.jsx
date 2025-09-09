import React, { useState, useRef } from "react";
import Message from "./Message.jsx";

const AddTransaction = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const timerRef = useRef(null);

  const showMessage = (type, text, duration = 3000) => {
    setMessage({ type, text });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMessage({ type: "", text: "" }), duration);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text || !amount) {
      showMessage("warning", "Please enter text and amount");
      return;
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount)) {
      showMessage("warning", "Amount must be a number");
      return;
    }

    if (!onAdd || typeof onAdd !== 'function') {
      showMessage("error", "Add transaction function is not available");
      return;
    }

    try {
      await onAdd({ text, amount: numAmount });
      showMessage("success", "Transaction added successfully!");
      setText("");
      setAmount("");
    } catch (err) {
      showMessage("error", err.message || "Failed to add transaction");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
        ➕ Add New Transaction
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-gray-600 font-medium mb-1">Text</label>
          <input
            id="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-gray-600 font-medium mb-1">
            Amount{" "}
            <span className="text-sm text-gray-500">
              (negative = expense, positive = income)
            </span>
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-indigo-700 transition duration-300"
        >
          Add Transaction
        </button>
      </form>
      {message.text && <Message type={message.type} text={message.text} />}
    </div>
  );
};

export default AddTransaction;
