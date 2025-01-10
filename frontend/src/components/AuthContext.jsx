import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Utiliser le token de localStorage si disponible, sinon initialiser à false
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [token, setToken] = useState(localStorage.getItem("token")); // Stocker le token

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setIsLoggedIn(true);
    setToken(newToken); // Mettre à jour le token dans le state
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken(null); // Réinitialiser le token dans le state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
