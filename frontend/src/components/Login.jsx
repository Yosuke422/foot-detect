import React, { useState } from "react";
import { loginUser } from "../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await loginUser(formData);
      setMessage("Connexion réussie");
      setToken(response.token); // Stockez ce token dans le localStorage si nécessaire
      localStorage.setItem("token", response.token);
    } catch (err) {
      setError(err.message); // Affiche l'erreur
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} />
        <button type="submit">Se connecter</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
