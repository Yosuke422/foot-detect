import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/CreateDetection.css";
import detection from "../assets/images/detection.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { DetectionAPI } from "../services/detectionService";
import {useAuth} from "../components/AuthContext"; 

const CreateDetection = () => {
  const { token } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    maxPlayers: "",
    ageGroup: "",
    positions: [],
    description: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    alert("Veuillez vous connecter pour réserver une détection.");
    navigate("/login");
    return;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
    if (step === 3 && !formData.image) {
      setError("Veuillez télécharger une image.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!token) {
      setError("Token non trouvé. Veuillez vous reconnecter.");
      return;
    }
  
    try {
      let positions = formData.positions;
  
      // Si positions est une chaîne de caractères, on la transforme en tableau de chaînes de caractères
      if (typeof positions === 'string') {
        positions = positions.split(',').map(position => position.trim());
      }
  
      // Si positions n'est toujours pas un tableau ou est vide, on lance une erreur
      if (!Array.isArray(positions) || positions.length === 0) {
        throw new Error("Le champ 'positions' doit être un tableau non vide.");
      }
  
      // Validation des positions (si elles sont valides selon les critères du backend)
      const validPositions = ["gardien de but", "défenseur", "milieu de terrain", "attaquant"];
      // Vérification si toutes les positions sont valides
      for (let position of positions) {
        if (!validPositions.includes(position)) {
          throw new Error(`Position invalide : ${position}. Choisissez parmi ${validPositions.join(", ")}.`);
        }
      }
  
      // On transforme 'positions' en une seule chaîne de caractères (comme pour ageGroup)
      const positionsString = positions.join(", ");  // Exemple: "gardien de but, attaquant"
  
      // Vérification des champs obligatoires
      const requiredFields = ["title", "location", "date", "time", "maxPlayers", "ageGroup", "positions"];
      for (let field of requiredFields) {
        if (!formData[field]) {
          throw new Error(`Le champ '${field}' est obligatoire.`);
        }
      }
  
      // Préparer les données à envoyer
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "positions") {
          // On envoie positions sous forme de chaîne de caractères
          formDataToSend.append(key, positionsString); 
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      // Si une image est présente, on l'ajoute
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }
  
      // Passer le token à l'API et envoyer la demande
      const response = await DetectionAPI.create(formDataToSend, token);
  
      // Message de succès et redirection après la création
      setMessage("Détection créée avec succès !");
      setTimeout(() => {
        navigate("/booking");
      }, 1500);
  
    } catch (err) {
      setError(err.message || "Erreur lors de la création de la détection. Veuillez réessayer.");
    }
  };
  
  


  return (
    <div className="create-detection-container" style={{ backgroundImage: `url(${detection})` }}>
      <div className="create-detection-card">
        <button className="back-to-home-button" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faHome} />
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
                <select
                  id="ageGroup"
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleChange}
                >
                  <option value="" disabled>-- Sélectionnez une tranche d'âge --</option>
                  <option value="u12">U12 (11-12 ans)</option>
                  <option value="u14">U14 (13-14 ans)</option>
                  <option value="u16">U16 (15-16 ans)</option>
                  <option value="u18">U18 (17-18 ans)</option>
                  <option value="senior">Senior (19 ans et plus)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Postes recherchés *</label>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      value="gardien de but"
                      checked={formData.positions.includes("gardien de but")}
                      onChange={handlePositionChange}
                    />
                    Gardien de but
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="défenseur"
                      checked={formData.positions.includes("défenseur")}
                      onChange={handlePositionChange}
                    />
                    Défenseur
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="milieu de terrain"
                      checked={formData.positions.includes("milieu de terrain")}
                      onChange={handlePositionChange}
                    />
                    Milieu de terrain
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="attaquant"
                      checked={formData.positions.includes("attaquant")}
                      onChange={handlePositionChange}
                    />
                    Attaquant
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="image">Image *</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Ajoutez une description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <button type="button" className="prev-button" onClick={handlePrevStep}>
                Précédent
              </button>
              <button type="submit" className="submit-button">
                Soumettre
              </button>
            </div>
          )}

          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateDetection;
