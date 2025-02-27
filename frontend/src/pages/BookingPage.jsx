import React, { useState, useEffect } from "react";
import "../assets/styles/BookingPage.css"; // Make sure the path is correct
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const BookingPage = () => {
  const [detections, setDetections] = useState([]);
  const [filteredDetections, setFilteredDetections] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    ageGroup: "",
    position: "",
  });

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role"); // "recruteur" or "joueur"

  // 1. Load detections from localStorage on mount
  useEffect(() => {
    const storedDetections = JSON.parse(localStorage.getItem("detections")) || [];
    setDetections(storedDetections);
    setFilteredDetections(storedDetections);
  }, []);

  // 2. Filter logic
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const filtered = detections.filter((d) => {
      const matchesTitle = filters.title
        ? d.title.toLowerCase().includes(filters.title.toLowerCase())
        : true;
      const matchesLocation = filters.location
        ? d.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchesAgeGroup = filters.ageGroup
        ? d.ageGroup === filters.ageGroup
        : true;
      const matchesPosition = filters.position
        ? d.positions && d.positions.includes(filters.position)
        : true;

      return matchesTitle && matchesLocation && matchesAgeGroup && matchesPosition;
    });

    setFilteredDetections(filtered);
  }, [filters, detections]);

  // 3. Handle reservation
  const handleReserve = (detectionId) => {
    if (!isLoggedIn) {
      alert("Veuillez vous connecter pour réserver une détection.");
      navigate("/login");
      return;
    }

    const reservedDetections = JSON.parse(localStorage.getItem("reservations")) || [];
    const detectionToReserve = detections.find((d) => d.id === detectionId);

    if (detectionToReserve) {
      const updatedReservations = [...reservedDetections, detectionToReserve];
      localStorage.setItem("reservations", JSON.stringify(updatedReservations));
      alert("Détection réservée avec succès !");
    }
  };

  // 4. Recruiter can delete
  const handleDeleteDetection = (detectionId) => {
    const updatedDetections = detections.filter((d) => d.id !== detectionId);
    setDetections(updatedDetections);
    setFilteredDetections(updatedDetections);
    localStorage.setItem("detections", JSON.stringify(updatedDetections));
    alert("Détection supprimée avec succès !");
  };

  return (
    <div className="booking-page">
      {/* Home icon to navigate back */}
      <button className="back-to-home-button" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHome} />
      </button>

      {/* Heading changes if userRole === 'recruteur' */}
      <h2>{userRole === "recruteur" ? "Mes Détections" : "Réserver une Détection"}</h2>

      {/* Show filters only if not recruteur */}
      {userRole !== "recruteur" && (
        <div className="filters">
          <h3>Filtres de recherche</h3>
          <div className="filter-group">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Rechercher par titre"
              value={filters.title}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="location">Lieu</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Rechercher par lieu"
              value={filters.location}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="ageGroup">Tranche d'âges</label>
            <select
              id="ageGroup"
              name="ageGroup"
              value={filters.ageGroup}
              onChange={handleFilterChange}
            >
              <option value="">-- Toutes les tranches --</option>
              <option value="U12">U12 (11-12 ans)</option>
              <option value="U14">U14 (13-14 ans)</option>
              <option value="U16">U16 (15-16 ans)</option>
              <option value="U18">U18 (17-18 ans)</option>
              <option value="Senior">Senior (19 ans et plus)</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="position">Poste</label>
            <select
              id="position"
              name="position"
              value={filters.position}
              onChange={handleFilterChange}
            >
              <option value="">-- Tous les postes --</option>
              <option value="Gardien de but">Gardien de but</option>
              <option value="Défenseur">Défenseur</option>
              <option value="Milieu de terrain">Milieu de terrain</option>
              <option value="Attaquant">Attaquant</option>
            </select>
          </div>
        </div>
      )}

      <div className="detection-list">
        {filteredDetections.length > 0 ? (
          filteredDetections.map((detection) => (
            <div key={detection.id} className="detection-item">
              <div className="card-inner">
                {/* FRONT: summary */}
                <div className="card-front">
                  <h4>{detection.title}</h4>
                  <p>
                    <strong>Lieu :</strong> {detection.location}
                  </p>
                  <p>
                    <strong>Tranche d'âges :</strong> {detection.ageGroup}
                  </p>
                  <p>
                    <strong>Postes :</strong> {detection.positions.join(", ")}
                  </p>
                  <p>
                    <strong>Date :</strong>{" "}
                    {new Date(detection.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Heure :</strong> {detection.time}
                  </p>
                  <p>
                    <strong>Nombre max de participants :</strong>{" "}
                    {detection.maxPlayers}
                  </p>
                </div>
                {/* BACK: description + (reserve or delete) */}
                <div className="card-back">
                  <h4>Description</h4>
                  <p>{detection.description || "Aucune description disponible."}</p>

                  {/* "Réserver" if not recruteur */}
                  {userRole !== "recruteur" && (
                    <button
                      className="reserve-button"
                      onClick={() => handleReserve(detection.id)}
                    >
                      Réserver
                    </button>
                  )}

                  {/* "Supprimer" if recruteur */}
                  {userRole === "recruteur" && (
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteDetection(detection.id)}
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune détection trouvée avec ces filtres.</p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
