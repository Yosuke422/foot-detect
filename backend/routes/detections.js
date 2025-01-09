const express = require("express");
const Detection = require("../models/Detection");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Route POST pour créer une détection (déjà existante)
router.post("/", authenticate, async (req, res) => {
  try {
    let {
      title,
      location,
      date,
      time,
      maxPlayers,
      ageGroup,
      positions,
      image,
      description,
    } = req.body;  // Déclarer positions avec let

    if (!title || !location || !date || !time || !maxPlayers || !ageGroup || !positions) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis" });
    }

    const validAgeGroups = ["u12", "u14", "u16", "u18", "senior"];
    if (!validAgeGroups.includes(ageGroup)) {
      return res.status(400).json({ message: `Tranche d'âge invalide : ${ageGroup}. Choisissez parmi ${validAgeGroups.join(", ")}` });
    }

    const validPositions = ["gardien de but", "défenseur", "milieu de terrain", "attaquant"];
    if(!validPositions.includes(positions)){
        return res.status(400).json({message :`Position invalide.`})
    }

    const newDetection = new Detection({
      title,
      location,
      date,
      time,
      maxPlayers,
      ageGroup,
      positions,
      image,
      description,
      createdBy: req.user.id,
    });

    const savedDetection = await newDetection.save();

    res.status(201).json({ message: "Détection créée avec succès", detection: savedDetection });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// Route GET pour récupérer toutes les détections
router.get("/", async (req, res) => {
  try {
    const detections = await Detection.find(); // Récupérer toutes les détections depuis la base de données

    if (!detections || detections.length === 0) {
      return res.status(404).json({ message: "Aucune détection trouvée" });
    }

    res.status(200).json(detections); // Retourne la liste des détections
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;
