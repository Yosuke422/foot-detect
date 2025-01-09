import React, { useState, useEffect } from "react";
import "../assets/styles/BookingPage.css";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { DetectionAPI } from "../services/detectionService"; // Import du service

const BookingPage = () => {
  const [detections, setDetections] = useState([]);
  const [filteredDetections, setFilteredDetections] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    ageGroup: "",
    position: "",
  });

  const { isLoggedIn, token } = useAuth();  // Récupérer le token depuis le contexte
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  // Récupérer les détections depuis l'API
  useEffect(() => {
    const fetchDetections = async () => {
      if (!token) return;  // Vérifier si le token est présent avant de faire l'appel API
      try {
        const data = await DetectionAPI.getAll(token);
        
        // Unifier les champs des données pour éviter des erreurs d'affichage
        const unifiedData = data.map(detection => ({
          _id: detection._id,
          titre: detection.titre || detection.title || "Titre non précisé",  // Gérer le cas où 'titre' ou 'title' est manquant
          lieu: detection.lieu || detection.location || "Lieu non précisé",  // Gérer le cas où 'lieu' ou 'location' est manquant
          date: detection.date || "Date non précisée",
          heure: detection.heure || "Heure non précisée",
          nombreDeJoueurs: detection.nombreDeJoueurs || "Non précisé",
          trancheDages: detection.trancheDages || detection.ageGroup || "Non précisé",
          postesRecherches: detection.postesRecherches || detection.positions || [],
          description: detection.description || "",
          image: detection.image || null
        }));
  
        setDetections(unifiedData);
        setFilteredDetections(unifiedData);
      } catch (error) {
        console.error(error.message);
        alert("Erreur lors de la récupération des détections : " + error.message);
      }
    };
  
    fetchDetections();
  }, [token]);  // Exécuter l'effet uniquement si le token change
  
  

  // Mise à jour des filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Appliquer les filtres
  useEffect(() => {
    const filtered = detections.filter((detection) => {
      const matchesTitle = filters.title
        ? detection.titre?.toLowerCase().includes(filters.title.toLowerCase())
        : true;
      const matchesLocation = filters.location
        ? detection.lieu?.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchesAgeGroup = filters.ageGroup
        ? detection.trancheDages === filters.ageGroup
        : true;
      const matchesPosition = filters.position
        ? detection.postesRecherches?.includes(filters.position)
        : true;

      return matchesTitle && matchesLocation && matchesAgeGroup && matchesPosition;
    });

    setFilteredDetections(filtered);
  }, [filters, detections]);

  // Fonction pour réserver une détection
  const handleReserve = async (detectionId) => {
    if (!isLoggedIn) {
      alert("Veuillez vous connecter pour réserver une détection.");
      navigate("/login");
      return;
    }

    if (!token) {
      alert("Token non trouvé. Veuillez vous reconnecter.");
      navigate("/login");
      return;
    }

    try {
      const userId = "USER_ID"; // Remplacez par l'ID utilisateur réel
      await DetectionAPI.reserve(detectionId, userId, token);  // Passez le token à l'API
      alert("Détection réservée avec succès !");
    } catch (error) {
      console.error(error.message);
      alert("Erreur lors de la réservation de la détection : " + error.message);
    }
  };

reservation-recruteur
  const handleDeleteDetection = (detectionId) => {
    const updatedDetections = detections.filter((d) => d.id !== detectionId);
    setDetections(updatedDetections);
    setFilteredDetections(updatedDetections);
    localStorage.setItem("detections", JSON.stringify(updatedDetections));
    alert("Détection supprimée avec succès !");
  };


  return (
    <div className="booking-page">
      <h2>Réserver une Détection</h2>

      {/* Filtres */}
      <div className="filters">
        <h3>Filtres de recherche</h3>
        <FilterInput
          label="Titre"
          id="title"
          name="title"
          value={filters.title}
          onChange={handleFilterChange}
        />
        <FilterInput
          label="Lieu"
          id="location"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <div className="filter-group">
          <label htmlFor="ageGroup">Tranche d'âges</label>
          <select
            id="ageGroup"
            name="ageGroup"
            value={filters.ageGroup}
            onChange={handleFilterChange}
          >
            <option value="">-- Toutes les tranches --</option>
            <option value="u12">U12 (11-12 ans)</option>
            <option value="u14">U14 (13-14 ans)</option>
            <option value="u16">U16 (15-16 ans)</option>
            <option value="u18">U18 (17-18 ans)</option>
            <option value="senior">Senior (19 ans et plus)</option>
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
            <option value="gardien de but">Gardien de but</option>
            <option value="défenseur">Défenseur</option>
            <option value="milieu de terrain">Milieu de terrain</option>
            <option value="attaquant">Attaquant</option>
          </select>
        </div>
      </div>

      {/* Liste des détections */}
      <div className="detection-list">
        {filteredDetections.length > 0 ? (
          filteredDetections.map((detection) => (
            <div key={detection._id} className="detection-item">
              <h4>{detection.titre}</h4>
              <p>
                <strong>Lieu :</strong> {detection.lieu || "Non précisé"}
              </p>
              <p>
                <strong>Tranche d'âges :</strong> {detection.trancheDages || "Non précisé"}
              </p>
              <p>
                <strong>Postes :</strong> {detection.postesRecherches?.join(", ") || "Aucun poste disponible"}
              </p>
              <p>
                <strong>Date :</strong> {new Date(detection.date).toLocaleDateString() || "Date non disponible"}
              </p>
              <p>
                <strong>Heure :</strong> {detection.heure || "Heure non précisée"}
              </p>
              <p>
                <strong>Nombre maximal de participants :</strong> {detection.nombreDeJoueurs || "Non précisé"}
              </p>

              <button
                className="reserve-button"
                onClick={() => handleReserve(detection._id)}
              >
                Réserver
              </button>

              {userRole === "recruteur" && (
                <button
                  className="delete-button"
                  onClick={() => handleDeleteDetection(detection.id)}
                >
                  Supprimer
                </button>
              )}

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
