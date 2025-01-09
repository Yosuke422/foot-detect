import axios from "axios";
import { API } from "../config/api";

// Fonction pour récupérer le token d'authentification via le AuthContext
const getAuthToken = (token) => token;

export const DetectionAPI = {
    // Récupérer toutes les détections
    getAll: async (authToken) => {
        if (!authToken) {
          throw new Error("Token non trouvé. Veuillez vous reconnecter.");
        }
    
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
    
        try {
          const response = await axios.get(API.detections.base, { headers });
          return response.data;
        } catch (error) {
          // Affichage d'informations plus détaillées pour le débogage
          console.error("Erreur lors de la récupération des détections", error);
          
          if (error.response) {
            console.error("Réponse de l'API :", error.response);
            if (error.response.status === 401) {
              throw new Error("Token invalide ou expiré. Veuillez vous reconnecter.");
            }
            throw new Error(error.response?.data?.message || "Erreur API inconnue.");
          } else if (error.request) {
            console.error("Aucune réponse reçue de l'API :", error.request);
            throw new Error("Aucune réponse de l'API, problème réseau ?");
          } else {
            console.error("Erreur lors de la configuration de la requête :", error.message);
            throw new Error("Erreur lors de la configuration de la requête.");
          }
        }
      },

    // Réserver une détection
    reserve: async (detectionId, userId, authToken) => {
      const token = getAuthToken(authToken); // Récupérer le token depuis le contexte

      if (!token) {
        throw new Error("Token non trouvé. Veuillez vous reconnecter.");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.post(API.detections.reserve(detectionId), { userId }, { headers });
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error("Token invalide ou expiré. Veuillez vous reconnecter.");
        }
        throw new Error(
          error.response?.data?.message || "Erreur lors de la réservation de la détection."
        );
      }
    },

    // Créer une nouvelle détection
    create: async (detectionData, authToken) => {
        const token = getAuthToken(authToken); // Récupérer le token depuis le contexte
    
        if (!token) {
          throw new Error("Token non trouvé. Veuillez vous reconnecter.");
        }
    
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
    
        try {
          const response = await axios.post(API.detections.base, detectionData, { headers });
          return response.data; // Retourne la réponse avec la détection créée
        } catch (error) {
          if (error.response && error.response.status === 401) {
            throw new Error("Token invalide ou expiré. Veuillez vous reconnecter.");
          }
          throw new Error(
            error.response?.data?.message || "Erreur lors de la création de la détection."
          );
        }
      },
};
