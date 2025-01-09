import React from "react"
import { useNavigate } from "react-router-dom"
import "../assets/styles/Home.css"
import joueurs from "../assets/images/joueurs.jpg"
import joueuses from "../assets/images/joueuses.jpg"
import ballon from "../assets/images/ballon.jpg"
import joueur from "../assets/images/joueur.jpg"
import logo from "../assets/images/Logo_foot_detect.webp"
import Footer from "../components/Footer"

const Home = () => {
  const navigate = useNavigate() 
  const role = localStorage.getItem("role")

  const handleReservationClick = () => {
    if (role === "recruteur") {
      navigate("/create-detection"); 
    } else {
      navigate("/booking");
    }
  }

  return (
    <div className="home">
      <section className="hero" style={{ backgroundImage: `url(${joueurs})` }}>
        <div className="hero-content">
        <img src={logo} alt="Foot'Detect" className="logo" />
          <h1>Foot'Detect</h1>
          <p>Trouvez votre chemin vers le football professionnel</p>
          <button className="cta-button" onClick={handleReservationClick}>Réserver</button>
        </div>
      </section>

      <section className="features">
        <h2>Découvrez Nos Fonctionnalités</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <img
              src={joueuses}
              alt="Réservations"
              className="feature-icon"
            />
            <h3>Réservations</h3>
            <p>Réservez vos créneaux pour les détections facilement et rapidement.</p>
          </div>
          <div className="feature-card">
            <img
              src={ballon}
              alt="Créer une Détection"
              className="feature-icon"
            />
            <h3>Créer une Détection</h3>
            <p>Les centres de formation et les recruteurs peuvent créer et gérer leurs détections.</p>
          </div>
          <div className="feature-card">
            <img
              src={joueur}
              alt="Recherche"
              className="feature-icon"
            />
            <h3>Recherche</h3>
            <p>Recherchez des détections ou des joueurs adaptés à vos besoins.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home