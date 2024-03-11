import express from "express";
const router = express.Router();
import knex from "../database.js";

router.get("/", async (request, response) => {
    try {
      // knex syntax for selecting things. Look up the documentation for knex for further info
      const reviews = await knex("review");
      response.json(reviews);
    } catch (error) {
      throw error;
    }
  });

  router.post("/", async (req, res) => {
    const newReviews = req.body;
    try {
      await knex("review").insert(newReviews);
      res.status(201).send("Review added");
    } catch (error) {
      res.status(500).send("Error adding review");
    }
  });


  router.get("/:id", async (request, response) => {
    try {
      const id = request.params.id;
      const reviews = await knex("review").where({ id }).first();
      
      if (reviews) {
        response.json(reviews);
      } else {
        response.status(404).json({ message: 'Review not found' });
      }
    } catch (error) {
      console.error("Error fetching review by ID:", error);
      response.status(500).json({ message: "Internal server error" });
    }
  });


  router.put("/:id", async (request, response) => {
    try {
      const id = request.params.id;
  
      const updateReviews = await knex("review").where({ id })
      .update({ number_of_guests : 20 })
      
      response.json(updateReviews);
      
    } catch (error) {
      console.error("Error fetching review by ID:", error);
      response.status(500).json({ message: "Internal server error" });
    }
  });


  router.delete("/:id", async (req, res) => {
    const id = req.params;
    try {
      const deletedCount = await knex("review").where({ id }).del();
      if (deletedCount === 0) {
        return res.status(404).send("Reviews not found");
      }
      res.send("Reviews are deleted");
    } catch (error) {
      res.status(500).send("Error deleting reviews");
    }
  });


export default router;
