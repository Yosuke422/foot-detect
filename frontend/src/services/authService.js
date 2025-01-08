import axios from "axios";
import { API } from "../config/api";

// Fonction d'inscription
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API.register, userData);
    return response.data; // Contient le message de succès
  } catch (error) {
    throw error.response ? error.response.data : { message: "Erreur du serveur" };
  }
};

// Fonction de connexion
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(API.login, userData);
    return response.data; // Contient le token JWT
  } catch (error) {
    throw error.response ? error.response.data : { message: "Erreur du serveur" };
  }
};
