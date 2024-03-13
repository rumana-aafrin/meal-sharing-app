import React from "react";
import { Link } from "react-router-dom";
import "./MealsLists.css";


const Meal = ({ meal }) => {
  const formattedPrice =
    typeof meal.price === "string" ? parseFloat(meal.price) : meal.price;


    
  return (
    <Link to={`/meals/${meal.id}`} className="meal-link">
      <div className="meal-card">
        <h3>{meal.title}</h3>
        <p>{meal.description}</p>
        {/* <p>Price: ${formattedPrice.toFixed(2)}</p> */}
        {formattedPrice ? (
          <p>Price: ${formattedPrice.toFixed(2)}</p>
        ) : (
          <p>No Price</p>
        )}
      </div>
    </Link>
  );
};

export default Meal;