import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./MealDetailsPage.css";

const MealDetailsPage = () => {
  const { id } = useParams();
  const [reservationData, setReservationData] = useState({
    phoneNumber: "",
    name: "",
    email: "",
    number_of_guests: 1 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();

    fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    })
      .then((response) => {
        if (response.ok) {
          // Reservation request was successful
          alert("Reservation successfully made!");
        } else {
          // Reservation request failed
          alert("Reservation failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Error occurred during the request
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="meal-details-page">
      <h1>Meal Details</h1>
      {/* Render meal details here */}
      <form onSubmit={handleReservationSubmit}>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={reservationData.phoneNumber}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={reservationData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={reservationData.email}
          onChange={handleInputChange}
        />
        <button type="submit">Book Seat</button>
      </form>
    </div>
  );
};

export default MealDetailsPage;
