import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AllMealsPage.css";

const AllMealsPage = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("/api/meals")
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="all-meals-page">
      <h1>All Meals</h1>
      <div className="meal-list">
        {meals.map((meal) => (
          <div key={meal.id} className="meal-item">
            <h3>{meal.title}</h3>
            <Link to={`/meals/${meal.id}`}>Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMealsPage;
