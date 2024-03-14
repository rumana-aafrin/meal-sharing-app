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

  
  router.post("/", async (req, res) => {
    const newReservation = req.body;
     newReservation.created_date = new Date();
    try {
      await knex("reservation").insert(newReservation);
      res.status(201).json("Reservation created successfully")
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error creating reservation" });
    }

  });



  router.get("/:id", async (req, res) => {

    try {
      const { id } = req.params;
      const reservations = await knex("reservation").select("*").where({ id }).first();
      if (reservations) {
        res.json(reservations);
      } else {
        res.status(404).json({ error: "Reservation not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error retrieving reservation" });
    }
  });
export default router;
