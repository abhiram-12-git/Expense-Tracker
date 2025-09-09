import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContextBase";
import Navbar from "../components/Navbar";

const PrivateLayout = () => {
  const { token, loading } = useContext(AuthContext);

  // Prevent redirect flicker while still checking token
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
