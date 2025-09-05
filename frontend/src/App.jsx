import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.jsx";
import { SearchProvider } from "./context/searchContext.jsx";
import { BalanceProvider } from "./context/BalanceContext.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard .jsx"; 
import Navbar from "./components/Navbar.jsx";
import TransactionList1 from "./pages/TransactionList1.jsx";
import TransactionList from "./components/TransactionList.jsx";
import AddTransaction from "./components/AddTransaction.jsx";

function PrivateLayout() {
  return (
    <div>
      <Navbar /> {/* ✅ Now uses SearchContext safely */}
      <main className="p-4">
        <Outlet /> {/* ✅ Renders child routes */}
      </main>
    </div>
  );
}

function App() {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <SearchProvider>
        <BalanceProvider>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={token ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={token ? <Navigate to="/" /> : <Register />}
            />

            {/* Protected routes */}
            <Route
              path="/"
              element={token ? <PrivateLayout /> : <Navigate to="/login" />}
            >
              <Route index element={<Dashboard />} />
              <Route path="/add" element={<AddTransaction/>}/>
              <Route path="/ShowTrans" element={<TransactionList1/>} />
              <Route path="transactions" element={<TransactionList/>} />
            </Route>
          </Routes>
        </BalanceProvider>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
