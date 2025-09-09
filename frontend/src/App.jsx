import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContextBase";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SearchProvider } from "./context/SearchContext";
import { BalanceProvider } from "./context/BalanceContext.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx"; 
import PrivateLayout from "./layouts/PrivateLayout.jsx";
import AddTransactionPage from "./pages/AddTransactionPage.jsx";
import AllTransactionsPage from "./pages/AllTransactionsPage.jsx";

function PublicOnlyRoutes() {
  const { token, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return token ? <Navigate to="/" replace /> : <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <BalanceProvider>
            <Routes>
              {/* Public Routes (only for guests) */}
              <Route element={<PublicOnlyRoutes />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* Private Routes */}
              <Route element={<PrivateLayout />}>
                <Route index path="/" element={<Dashboard />} />
                <Route path="add" element={<AddTransactionPage />} />
                <Route path="transactions" element={<AllTransactionsPage />} />
              </Route>

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BalanceProvider>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;