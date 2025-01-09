import axios from "axios";
import { API } from "../config/api";

// Fonction d'inscription
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API.auth.register, userData); // Utilisation de API.auth.register
    return response.data; // Contient le message de succès
  } catch (error) {
    throw error.response ? error.response.data : { message: "Erreur du serveur" };
  }
};

// Fonction de connexion
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(API.auth.login, userData);
    console.log("Réponse de connexion:", response.data); // Log de la réponse pour déboguer
    const { token } = response.data;
    if (token) {
      return response.data; // Retourne la réponse complète, incluant le token
    } else {
      throw new Error("Token manquant dans la réponse");
    }
  } catch (error) {
    console.error("Erreur de connexion:", error.response || error); // Log de l'erreur pour déboguer
    throw error.response ? error.response.data : { message: "Erreur du serveur" };
  }
};

