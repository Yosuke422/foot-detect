import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../assets/styles/Register.css";
import stade from "../assets/images/stade.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "joueur", // Default role when switch is off
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleToggle = (e) => {
    const isChecked = e.target.checked;
    setFormData({
      ...formData,
      role: isChecked ? "recruteur" : "joueur", // Toggle role based on switch state
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        
      });

      // Store the role in localStorage
      localStorage.setItem("role", formData.role);

      setMessage("Inscription réussie !");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="register-container" style={{ backgroundImage: `url(${stade})` }}>
      <div className="register-card">
        <h2>Créer un Compte</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Entrez votre nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
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
              placeholder="Créez un mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirmez votre mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Choisir un rôle</label>
            <div className="role-toggle">
              <span className={`role-label ${formData.role === "joueur" ? "active" : ""}`}>
                Joueur
              </span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.role === "recruteur"}
                  onChange={handleRoleToggle}
                />
                <span className="slider"></span>
              </label>
              <span className={`role-label ${formData.role === "recruteur" ? "active" : ""}`}>
                Recruteur
              </span>
            </div>
          </div>
          <button type="submit" className="register-button">
            S'inscrire
          </button>
        </form>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="login-link">
          Déjà inscrit ? <a href="/login">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
