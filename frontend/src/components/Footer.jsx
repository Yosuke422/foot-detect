import React from "react"
import "../assets/styles/Footer.css"
import logo from "../assets/images/Logo_foot_detect.webp"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={logo} alt="Foot'Detect" className="logo" />
          <p>Votre chemin vers le football professionnel.</p>
        </div>

        <div className="footer-links">
          <h3>Navigation</h3>
          <ul>
            <li><a href="/#">À propos</a></li>
            <li><a href="/#">Contact</a></li>
            <li><a href="/#">Conditions d'utilisation</a></li>
            <li><a href="/#">Politique de confidentialité</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Suivez-nous</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy {new Date().getFullYear()} Foot'Detect. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

export default Footer
