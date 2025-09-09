/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContextBase.jsx";

// ✅ Create context
export const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const { token } = useContext(AuthContext) || {};
  const [transactions, setTransactions] = useState([]);

  const API_URL = "https://expense-tracker-abhi.onrender.com/api/transactions";

  // ✅ Fetch transactions
  const fetchTransactions = useCallback(
    async () => {
      if (!token) return;
      try {
        const res = await axios.get(API_URL, {
          headers: { "x-auth-token": token },
        });
        setTransactions(res.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch transactions:", err?.response?.data || err.message);
        setTransactions([]);
      }
    }, [token]
  )

  // ✅ Add transaction
  const addTransaction = async (transaction) => {
    try {
      const availableBalance = transactions.reduce((acc, t) => acc + t.amount, 0);

      if (transaction.amount < 0 && Math.abs(transaction.amount) > availableBalance) {
        throw new Error("Insufficient balance");
      }

      const res = await axios.post(API_URL, transaction, {
        headers: { "x-auth-token": token },
      });

      await fetchTransactions();
      return res.data;
    } catch (err) {
      console.error("❌ Failed to add transaction:", err?.response?.data || err.message);
      throw err;
    }
  };

  // ✅ Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { "x-auth-token": token },
      });
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete transaction:", err?.response?.data || err.message);
      throw err;
    }
  };

  // ✅ Auto-fetch on token change
  useEffect(() => {
    if (token) fetchTransactions();
  }, [fetchTransactions, token]);

  // ✅ Derived values
  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  const income = transactions.filter((t) => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter((t) => t.amount < 0).reduce((acc, t) => acc + t.amount, 0) * -1;

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
