import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import du hook useNavigate
import { loginUser } from "../services/authService";
import "../assets/styles/Login.css";
import stade from "../assets/images/stade.jpg";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook pour redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await loginUser(formData);
      setMessage("Connexion réussie !");
      localStorage.setItem("token", response.token); // Stockage du token
      setTimeout(() => {
        navigate("/"); // Redirection vers la page d'accueil après 2 secondes
      }, 2000);
    } catch (err) {
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${stade})` }}>
      <div className="login-card">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          {/* Champs de connexion */}
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
        </form>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="register-link">
          Pas encore inscrit ? <a href="/register">Créer un compte</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
