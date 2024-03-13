import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // Fetch only a subset of meals for the homepage
    fetch("/api/meals?limit=5") // Adjust the limit as per your requirement
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to Our Restaurant</h1>
      <h2>Discover Delicious Meals</h2>
      <div className="meal-list">
        {meals.map((meal) => (
          <div key={meal.id} className="meal-item">
            <h3>{meal.title}</h3>
            <p>{meal.description}</p>
            <Link to={`/meals/${meal.id}`}>See More</Link>
          </div>
        ))}
      </div>
      <Link to="/meals" className="btn">
        View All Meals
      </Link>
    </div>
  );
};

export default HomePage;
