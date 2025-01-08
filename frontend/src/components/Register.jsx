import React, { useState } from "react";
import { registerUser } from "../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await registerUser(formData);
      setMessage(response.message); // Message de succès
    } catch (err) {
      setError(err.message); // Affiche l'erreur
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Nom d'utilisateur" value={formData.username} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} />
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
