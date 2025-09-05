import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // only if you’re using expiry checking

// ✅ Create & export context
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// ✅ Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const isTokenValid = (tok) => {
    try {
      const decoded = jwtDecode(tok);
      if (!decoded.exp) return false;
      return decoded.exp * 1000 > Date.now();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    if (token) {
      if (!isTokenValid(token)) {
        logout();
      } else {
        localStorage.setItem("token", token);
      }
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken) => setToken(newToken);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
