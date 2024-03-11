import express from "express";
const router = express.Router();
import knex from "../database.js";

router.get("/", async (request, response) => {
    try {
      // knex syntax for selecting things. Look up the documentation for knex for further info
      const reservations = await knex("reservation");
      response.json(reservations);
    } catch (error) {
      throw error;
    }
  });


  router.post("/", async (request, response) => {
    try {
      const newReservations = request.body.number_of_guests;
      console.log(newReservations);
      
      const insertedReservations = await knex("reservation").insert({
        "number_of_guests": newReservations,
        "created_date": "2023-11-10",
        "contact_phonenumber": "+1 (555) 123-4567",
        "contact_name": "Alice Johnson",
        "contact_email": "alice@ymail.com",
        "meal_id": 3,
      });
      response.json(insertedReservations);
    }
      catch (error) {
        console.error("Error fetching meals:", error);
        response.status(500).json({ message: "Internal server error" });
    }
  });
  
  // GET : http://localhost:9000/programmer/<id>
  router.get("/:id", async (request, response) => {
    try {
      const id = request.params.id;
      const reservations = await knex("reservation").where({ id }).first();
      
      if (reservations) {
        response.json(reservations);
      } else {
        response.status(404).json({ message: 'Meal not found' });
      }
    } catch (error) {
      console.error("Error fetching meal by ID:", error);
      response.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  // PUT : http://localhost:9000/programmer/<id>
  router.put("/:id", async (request, response) => {
    try {
      const id = request.params.id;
  
      const updateReservations = await knex("reservation").where({ id })
      .update({ number_of_guests : 20 })
      
      response.json(updateReservations);
      
    } catch (error) {
      console.error("Error fetching meal by ID:", error);
      response.status(500).json({ message: "Internal server error" });
    }
  });
  
  // DELETE : http://localhost:9000/programmer/<id>
  router.delete("/:id", async (req, res) => {
    const id = req.params;
    try {
      const deletedCount = await knex("reservation").where({ id }).del();
      if (deletedCount === 0) {
        return res.status(404).send("Reservation not found");
      }
      res.send("Reservations deleted");
    } catch (error) {
      res.status(500).send("Error deleting meal");
    }
  });
export default router;
