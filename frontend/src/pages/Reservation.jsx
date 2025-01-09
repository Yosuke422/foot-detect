// ReservationPage.js
import React from "react";
import EventCard from "../components/EventsContainer";
import ballon from "../assets/images/ballon.jpg";

const ReservationPage = () => {
  const events = [
    {
      image: ballon,
      name: "Match Détection U10-U11",
      date: "15 janvier 2025",
      time: "14:00",
      location: "Stade Municipal",
      category: "U10-U11",
      trainingCenter: "Centre de Formation ABC",
    },
    {
      image: ballon,
      name: "Match Détection U12-U13",
      date: "22 janvier 2025",
      time: "16:00",
      location: "Stade Olympique",
      category: "U12-U13",
      trainingCenter: "Centre de Formation XYZ",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Réservation de Détection
      </h1>
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default ReservationPage;
