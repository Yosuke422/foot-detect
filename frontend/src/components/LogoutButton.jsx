import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    navigate("/login"); // Redirige vers la page de connexion
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Déconnexion
    </button>
  );
};

export default LogoutButton;
