import React, { useState, useEffect } from 'react';
import myLogo from '../assets/images/Logo_foot_detect.webp';
import '../assets/styles/Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      {scrolled && (
        <>
          {/* Logo */}
          <div className="navbar__brand">
            <img src={myLogo} alt="My Logo" className="navbar__logo" />
          </div>

          {/* Search Bar */}
          <div className="navbar__search">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>

          {/* Links */}
          <div style={{ marginRight: '50px' }}>
            <ul className="navbar__links">
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Réservations</a></li>
              <li><a href="#about">About</a></li>
              <div className="navbar__login">
            <a href="/login" className="login-button">
              Connexion
            </a>
          </div>
            </ul>
          </div>  
        </>
      )}
    </nav>
  );
}

export default Navbar;
