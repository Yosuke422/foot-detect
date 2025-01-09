import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; // Utilisation du hook useAuth
import { loginUser } from "../services/authService"; // Assurez-vous d'importer la fonction loginUser
import "../assets/styles/Login.css";
import stade from "../assets/images/stade.jpg";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();  // Utiliser la fonction login du contexte
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Réinitialiser l'erreur

    try {
      const response = await loginUser(formData);  // Appel à la fonction loginUser
      const { token } = response;  // Extraire le token de la réponse

      if (token) {
        login(token);  // Appeler la fonction login pour mettre à jour le contexte et le localStorage
        navigate("/");  // Rediriger vers la page d'accueil ou autre page après la connexion
      }
    } catch (err) {
      setError("Connexion échouée");
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${stade})` }}>
      <div className="login-card">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Entrez votre email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Se connecter
          </button>
          <p> Vous n'avez pas de compte ? <a href="/register">Inscrivez-vous</a></p>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
