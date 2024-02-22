import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  const login = () => {
    // Perform login logic, set isAuthenticated to true
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Clear the access token on logout
    localStorage.removeItem('access_token');
    // Update the authentication state
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);