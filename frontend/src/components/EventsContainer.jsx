import React from "react";
import PropTypes from "prop-types";

const EventCard = ({ event }) => {
  const cardStyle = {
    display: "flex",
    alignItems: "flex-start",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "16px",
    width: "70%",
    margin: "auto",
    marginBottom: "50px",
  };

  const imageStyle = {
    width: "250px",
    height: "250px",
    objectFit: "cover",
  };

  const detailsStyle = {
    padding: "16px",
    flex: 1,
  };

  const titleStyle = {
    margin: "0 0 8px",
    fontSize: "18px",
    color: "#333",
  };

  return (
    <div style={cardStyle}>
      <img src={event.image} alt={event.name} style={imageStyle} />
      <div style={detailsStyle}>
        <h2 style={titleStyle}>{event.name}</h2>
        <p>
          <strong>Date:</strong> {event.date} à {event.time}
        </p>
        <p>
          <strong>Lieu:</strong> {event.location}
        </p>
        <p>
          <strong>Catégorie:</strong> {event.category}
        </p>
        <p>
          <strong>Centre de formation:</strong> {event.trainingCenter}
        </p>
      </div>
      <button>S'inscrire</button>
    </div>
  );
};

// Définir les propTypes après la déclaration du composant
EventCard.propTypes = {
  event: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    trainingCenter: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
