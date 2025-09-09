import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';
import { AuthContext } from './AuthContextBase';

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate JWT token
  const isTokenValid = useCallback((tok) => {
    try {
      if (!tok) return false; // ✅ Check if token exists before decoding
      const decoded = jwtDecode(tok);
      if (!decoded.exp) {
        console.warn('Token has no expiration field');
        return false;
      }
      return decoded.exp * 1000 > Date.now();
    } catch (err) {
      console.error('Token validation failed:', err);
      return false;
    }
  }, []);

  // Initialize token from localStorage on mount (SSR-safe)
  useEffect(() => {
    const initializeAuth = async () => { // ✅ Wrap in async function
      try {
        const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (storedToken && isTokenValid(storedToken)) {
          setToken(storedToken);
        } else {
          localStorage.removeItem('token');
          setToken(null); // ✅ Ensure token is null if invalid
        }
      } catch (err) {
        console.error('Error accessing localStorage:', err);
        localStorage.removeItem('token');
        setToken(null); // ✅ Ensure token is null on error
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [isTokenValid]);

  // Sync token changes to localStorage
  useEffect(() => {
    if (token) {
      if (isTokenValid(token)) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
        setToken(null);
      }
    } else {
      localStorage.removeItem('token');
    }
  }, [token, isTokenValid]);

  // Login and logout functions
  const login = useCallback(
    (newToken) => {
      if (isTokenValid(newToken)) {
        setToken(newToken);
      } else {
        console.warn('Attempted to login with invalid token');
      }
    }, [isTokenValid]
  );

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      token,
      isAuthenticated: !!token && isTokenValid(token),
      loading,
      login,
      logout,
    }),
    [token, isTokenValid, loading, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};