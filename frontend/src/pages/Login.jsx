import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../components/AuthContext"
import "../assets/styles/Login.css"
import stade from "../assets/images/stade.jpg"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const fakeToken = "fake-jwt-token"
      login(fakeToken) 
      navigate("/") 
    } catch (err) {
      setError("Connexion échouée")
    }
  }

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
  )
}

export default Login
