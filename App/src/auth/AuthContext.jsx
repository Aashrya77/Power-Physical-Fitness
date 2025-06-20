import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../config.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('authToken');
    if (token) {
      // Set the token in axios headers
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Verify token and get user data
      verifyAuth();
    } else {
      setLoading(false);
    }
  }, []);

  //verify auth function to check if the user is logged in
  const verifyAuth = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/gym/verify`);
      if (data && data.user) {
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        // If no user data is returned, clear the auth state
        logout();
      }
    } catch (error) {
      console.error('Auth verification failed:', error);
      // Only logout if it's an authentication error (401)
      if (error.response && error.response.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };
//login
  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
    setIsLoggedIn(true);
  };
//logout
  const logout = () => {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    user,
    loading,
    login,
    logout,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
