import React, { useState, useEffect } from "react";
import "../assets/styles/BookingPage.css";

const BookingPage = () => {
  const [detections, setDetections] = useState([]); // Liste complète des détections
  const [filteredDetections, setFilteredDetections] = useState([]); // Liste filtrée
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    ageGroup: "",
    position: "",
  });

  // Charger les détections depuis l'API
  useEffect(() => {
    fetch("/api/detections")
      .then((res) => res.json())
      .then((data) => {
        setDetections(data);
        setFilteredDetections(data); // Par défaut, aucune recherche
      })
      .catch((err) => console.error("Erreur lors du chargement des détections :", err));
  }, []);

  // Gestion des changements de filtre
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Appliquer les filtres
  useEffect(() => {
    const filtered = detections.filter((detection) => {
      const matchesTitle = filters.title
        ? detection.title.toLowerCase().includes(filters.title.toLowerCase())
        : true;
      const matchesLocation = filters.location
        ? detection.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchesAgeGroup = filters.ageGroup
        ? detection.ageGroup === filters.ageGroup
        : true;
      const matchesPosition = filters.position
        ? detection.positions && detection.positions.includes(filters.position)
        : true;

      return matchesTitle && matchesLocation && matchesAgeGroup && matchesPosition;
    });

    setFilteredDetections(filtered);
  }, [filters, detections]);

  return (
    <div className="booking-page">
      <h2>Réserver une Détection</h2>

      {/* Section des filtres */}
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

      {/* Liste des détections */}
      <div className="detection-list">
        {filteredDetections.length > 0 ? (
          filteredDetections.map((detection) => (
            <div key={detection.id} className="detection-item">
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
                <strong>Date :</strong> {new Date(detection.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Heure :</strong> {detection.time}
              </p>
              <button className="reserve-button">Réserver</button>
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
