import React, { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext"; // Import du contexte Auth
import { Link, useNavigate } from "react-router-dom";
import myLogo from "../assets/images/Logo_foot_detect.webp";
import "../assets/styles/Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, logout } = useAuth(); // Utilise les données du contexte
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirige vers la page de connexion après déconnexion
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

              {/* Bouton Connexion / Déconnexion */}
              <div className="navbar__auth">
                {isLoggedIn ? (
                  <button onClick={handleLogout} className="logout-button">
                    Déconnexion
                  </button>
                ) : (
                  <Link to="/login" className="login-button">
                    Connexion
                  </Link>
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
