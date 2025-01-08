import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    positions: [], // Postes multiples
    description: "",
    image: null, // Nouveau champ pour l'image
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gestion des cases à cocher pour les postes
  const handlePositionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        positions: [...prevData.positions, value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        positions: prevData.positions.filter((position) => position !== value),
      }));
    }
  };

  // Gestion de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
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
    if (step === 3 && (!formData.ageGroup || formData.positions.length === 0)) {
      setError("Veuillez sélectionner une tranche d'âge et au moins un poste.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Préparation des données pour l'envoi
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "positions") {
        formData[key].forEach((position) => {
          formDataToSend.append("positions[]", position); // Gérer les tableaux
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Envoyer les données au backend
    fetch("/api/detections", {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage("Détection créée avec succès !");
        setTimeout(() => {
          navigate("/booking"); // Redirige vers la page de réservation
        }, 1500);
      })
      .catch((error) => {
        console.error("Erreur lors de la création :", error);
        setError("Une erreur est survenue lors de la création de la détection.");
      });
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
                <label>Postes recherchés *</label>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      value="Gardien de but"
                      checked={formData.positions.includes("Gardien de but")}
                      onChange={handlePositionChange}
                    />
                    Gardien de but
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Défenseur"
                      checked={formData.positions.includes("Défenseur")}
                      onChange={handlePositionChange}
                    />
                    Défenseur
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Milieu de terrain"
                      checked={formData.positions.includes("Milieu de terrain")}
                      onChange={handlePositionChange}
                    />
                    Milieu de terrain
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Attaquant"
                      checked={formData.positions.includes("Attaquant")}
                      onChange={handlePositionChange}
                    />
                    Attaquant
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="image">Image *</label>
                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Ajoutez des détails"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
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
