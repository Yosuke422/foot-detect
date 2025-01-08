const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post("/register", async (req, res) => {
    console.log(req.body); // Vérifie les données reçues dans la requête
    try {
      const { username, email, password } = req.body;
  
      // Vérification des champs
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires" });
      }
  
      // Vérification si l'utilisateur existe déjà
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà" });
      }
  
      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Création de l'utilisateur
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      // Sauvegarde dans la base de données
      await newUser.save();
      res.status(201).json({ message: "Utilisateur créé avec succès !" });
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  });
  


// Route de connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Mot de passe incorrect.' });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur du serveur', error: err.message });
  }
});

module.exports = router;
