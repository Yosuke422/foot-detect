const mongoose = require("mongoose");

const detectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  maxPlayers: { type: Number, required: true },
  ageGroup: {
    type: String,
    enum: ["u12", "u14", "u16", "u18", "senior"], // Seulement un choix
    required: true,
  },
  positions: {
    type: [String],
    enum: ["gardien de but", "défenseur", "milieu de terrain", "attaquant"], // Liste multiple
    required: true,
  },
  image: { type: String, default: null }, // Image optionnelle
  description: { type: String, default: "" }, // Description optionnelle
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Lien avec l'utilisateur connecté
}, {
  timestamps: true, // Pour ajouter createdAt et updatedAt
});

module.exports = mongoose.model("Detection", detectionSchema);
