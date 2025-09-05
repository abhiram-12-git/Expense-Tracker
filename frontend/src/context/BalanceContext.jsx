import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";

// 1️⃣ Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  const API_URL = "https://expense-tracker-abhi.onrender.com";

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { "x-auth-token": token },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  };

  // Add transaction
  const addTransaction = async (transaction) => {
  const availableBalance = transactions.reduce((acc, t) => acc + t.amount, 0);

  // ✅ Only block withdrawals that exceed balance
  if (transaction.amount < 0 && Math.abs(transaction.amount) > availableBalance) {
    throw new Error("Insufficient balance");
  }

  const res = await axios.post(API_URL, transaction, {
    headers: { "x-auth-token": token },
  });
  setTransactions([...transactions, res.data]);
  return res.data;
};

  // Delete transaction
  const deleteTransaction = async (id) => {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { "x-auth-token": token },
    });
    setTransactions(transactions.filter((t) => t._id !== id));
  };

  // Auto-fetch when token changes
  useEffect(() => {
    if (token) fetchTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Derived values
  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const expense =
    transactions
      .filter((t) => t.amount < 0)
      .reduce((acc, t) => acc + t.amount, 0) * -1;

  // 2️⃣ Provide the context
  return (
    <BalanceContext.Provider
      value={{
        transactions,
        balance,
        income,
        expense,
        fetchTransactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
