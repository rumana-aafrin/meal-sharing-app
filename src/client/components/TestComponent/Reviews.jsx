import React, { useState } from "react";
import "./Reviews.css";

const Reviews = () => {
  const [review, setReview] = useState({
    name: "",
    comment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = () => {
    // Implement review submission logic using fetch
    // Make a POST request to your backend API to create a review
    // Use review state to send the form data
  };

  return (
    <div className="reviews">
      <h3>Leave a Review</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={review.name}
          onChange={handleInputChange}
        />
        <textarea
          name="comment"
          placeholder="Your Review"
          value={review.comment}
          onChange={handleInputChange}
        ></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Reviews;
