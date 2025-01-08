import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import du hook pour la navigation
import "../assets/styles/CreateDetection.css";
import detection from "../assets/images/detection.jpg";

const CreateDetection = () => {
  const [step, setStep] = useState(1); // Étape actuelle
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    maxPlayers: "",
    ageGroup: "",
    position: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook pour la navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const validateStep = () => {
    if (step === 1 && (!formData.title || !formData.location)) {
      setError("Veuillez remplir tous les champs requis.");
      return false;
    }
    if (step === 2 && (!formData.date || !formData.time || !formData.maxPlayers)) {
      setError("Veuillez compléter les champs obligatoires.");
      return false;
    }
    if (step === 3 && (!formData.ageGroup || !formData.position)) {
      setError("Veuillez sélectionner une tranche d'âge et un poste.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulation d'une API ou enregistrement local
    console.log("Detection Created:", formData);
    setMessage("Détection créée avec succès !");
    setFormData({
      title: "",
      location: "",
      date: "",
      time: "",
      maxPlayers: "",
      ageGroup: "",
      position: "",
      description: "",
    });
    setStep(1); // Réinitialise l'étape
  };

  return (
    <div className="create-detection-container" style={{ backgroundImage: `url(${detection})` }}>
      <div className="create-detection-card">
        {/* Bouton Retour à l'accueil */}
        <button className="back-to-home-button" onClick={() => navigate("/")}>
          Retour à l'accueil
        </button>

        <h2>Créer une Détection</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Nom de la détection"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Lieu</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Adresse ou ville"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <button type="button" className="next-button" onClick={handleNextStep}>
                Suivant
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Heure</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="maxPlayers">Nombre maximum de joueurs</label>
                <input
                  type="number"
                  id="maxPlayers"
                  name="maxPlayers"
                  placeholder="Ex: 20"
                  value={formData.maxPlayers}
                  onChange={handleChange}
                />
              </div>
              <button type="button" className="prev-button" onClick={handlePrevStep}>
                Précédent
              </button>
              <button type="button" className="next-button" onClick={handleNextStep}>
                Suivant
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="ageGroup">Tranche d'âges</label>
                <select id="ageGroup" name="ageGroup" value={formData.ageGroup} onChange={handleChange}>
                  <option value="" disabled>-- Sélectionnez une tranche d'âge --</option>
                  <option value="U12">U12 (11-12 ans)</option>
                  <option value="U14">U14 (13-14 ans)</option>
                  <option value="U16">U16 (15-16 ans)</option>
                  <option value="U18">U18 (17-18 ans)</option>
                  <option value="Senior">Senior (19 ans et plus)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="position">Poste recherché</label>
                <select id="position" name="position" value={formData.position} onChange={handleChange}>
                  <option value="" disabled>-- Sélectionnez un poste --</option>
                  <option value="Gardien de but">Gardien de but</option>
                  <option value="Défenseur">Défenseur</option>
                  <option value="Milieu de terrain">Milieu de terrain</option>
                  <option value="Attaquant">Attaquant</option>
                </select>
              </div>
              <button type="button" className="prev-button" onClick={handlePrevStep}>
                Précédent
              </button>
              <button type="submit" className="submit-button">
                Créer la Détection
              </button>
            </div>
          )}
        </form>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default CreateDetection;
