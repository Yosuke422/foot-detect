import React, { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { Link } from "react-router-dom";
import myLogo from "../assets/images/Logo_foot_detect.webp";
import "../assets/styles/Navbar.css";
import Search from "./Search";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn } = useAuth(); 
  const role = localStorage.getItem("role"); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); 
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      {scrolled && (
        <>
          <div className="navbar__brand">
            <img src={myLogo} alt="My Logo" className="navbar__logo" />
          </div>

          <div className="navbar__search">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              onClick={handleOpenModal}
            />
            <button className="search-button" onClick={handleOpenModal}>
              Search
            </button>
          </div>

          <div style={{ marginRight: "50px" }}>
            <ul className="navbar__links">
              <li>
                <a href="/">Home</a>
              </li>
              {role === "recruteur" ? (
                <>
                <li>
                  <a href="/create-detection">Créer une Détection</a>
                </li>
                <li>
                    <a href="/booking">Mes détection</a>
                  </li>
                </>
              ) : (
                <><li>
                    <a href="/booking">Réservations</a>
                  </li><li>
                      <a href="/reservation">mes réservations</a>
                    </li></>
              )}

              <div className="navbar__auth">
                {isLoggedIn ? (
                  <Link to="/login" onClick={handleLogout} className="logout-button">
                    Déconnexion
                  </Link>
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
      <Search showModal={showModal} onClose={handleCloseModal} />
    </nav>
  );
}

export default Navbar;
