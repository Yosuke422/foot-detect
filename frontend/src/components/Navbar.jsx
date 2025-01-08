import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import pour redirection
import myLogo from "../assets/images/Logo_foot_detect.webp";
import "../assets/styles/Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour vérifier la connexion
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Vérifie si un token est présent dans le localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Si un token existe, l'utilisateur est connecté
  }, []);

  const handleLogout = () => {
    // Supprime le token et redirige vers la page de connexion
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      {scrolled && (
        <>
          {/* Logo */}
          <div className="navbar__brand">
            <img src={myLogo} alt="My Logo" className="navbar__logo" />
          </div>

          {/* Search Bar */}
          <div className="navbar__search">
            <input type="text" placeholder="Search..." className="search-input" />
            <button className="search-button">Search</button>
          </div>

          {/* Links */}
          <div style={{ marginRight: "50px" }}>
            <ul className="navbar__links">
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Réservations</a></li>
              <li><a href="#about">About</a></li>

              {/* Connexion / Déconnexion */}
              <div className="navbar__auth">
                {isLoggedIn ? (
                  <button onClick={handleLogout} className="logout-button">
                    Déconnexion
                  </button>
                ) : (
                  <a href="/login" className="login-button">
                    Connexion
                  </a>
                )}
              </div>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
