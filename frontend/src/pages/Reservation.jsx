import React, { useState, useEffect } from "react";
import "../assets/styles/BookingPage.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load existing reservations from localStorage
    const storedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
    setReservations(storedReservations);
  }, []);

  // Remove a reservation by ID
  const handleRemoveReservation = (reservationId) => {
    const updated = reservations.filter((res) => res.id !== reservationId);
    setReservations(updated);
    localStorage.setItem("reservations", JSON.stringify(updated));
    alert("Réservation supprimée !");
  };

  return (
    <div className="booking-page">
      {/* Go back home */}
      <button className="back-to-home-button" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHome} />
      </button>

      <h2>Mes Réservations</h2>

      {reservations.length === 0 ? (
        <p>Vous n'avez aucune réservation pour le moment.</p>
      ) : (
        <div className="detection-list">
          {reservations.map((res) => (
            <div key={res.id} className="detection-item">
              <div className="card-inner">
                <div className="card-front">
                  <h4>{res.title}</h4>
                  <p>
                    <strong>Lieu :</strong> {res.location}
                  </p>
                  <p>
                    <strong>Tranche d'âges :</strong> {res.ageGroup}
                  </p>
                  <p>
                    <strong>Postes :</strong> {res.positions.join(", ")}
                  </p>
                  <p>
                    <strong>Date :</strong> 
                    {new Date(res.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Heure :</strong> {res.time}
                  </p>
                  <p>
                    <strong>Nombre max de participants :</strong> 
                    {res.maxPlayers}
                  </p>
                </div>
                <div className="card-back">
                  <h4>Description</h4>
                  <p>{res.description || "Aucune description disponible."}</p>

                  {/* Button to remove reservation */}
                  <button
                    className="delete-button"
                    onClick={() => handleRemoveReservation(res.id)}
                  >
                    Annuler la Réservation
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;
