import express from "express";
const router = express.Router();
import knex from "../database.js";

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meal").select("title");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});
router.post("/", async (request, response) => {
  try {
    const mealTitle = request.body.title;
    console.log(mealTitle);
    
    const insertedMeals = await knex("meal").insert({
      "title": mealTitle,
      "description": "Treat yourself to a taste of Mexico with flavorful tacos, fresh guacamole, and vibrant salsa.",
      "location": "Colorful Cantina, Main Street",
      "when": "2024-01-15T16:00:00.000Z",
      "max_reservations": 10,
      "price": 20,
      "created_date": "2023-11-30T23:00:00.000Z"
    });
    response.json(insertedMeals);
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
    const meal = await knex("meal").where({ id }).first();
    
    if (meal) {
      response.json(meal);
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

    const updateMeal = await knex("meal").where({ id })
    .update({ title: 'Homer' })
    
    response.json(updateMeal);
    
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    response.status(500).json({ message: "Internal server error" });
  }
});

// DELETE : http://localhost:9000/programmer/<id>
router.delete("/:id", async (req, res) => {
  const id = req.params;
  try {
    const deletedCount = await knex("meal").where({ id }).del();
    if (deletedCount === 0) {
      return res.status(404).send("Meal not found");
    }
    res.send("Meal deleted");
  } catch (error) {
    res.status(500).send("Error deleting meal");
  }
});




router.get("/", async (request, response) => {
  router.get("/", async (req, res) => {
    try {
      // knex syntax for selecting things. Look up the documentation for knex for further info
      const titles = await knex("meal").select("title");
      response.json(titles);
      let meals = knex("meal");
  
      const {
        maxPrice,
        availableReservations,
        title,
        dateAfter,
        dateBefore,
        limit,
        sortKey,
        sortDir
      } = req.query;
  
      meals = maxPrice || maxPrice === "0" ? meals.where("price", "<", maxPrice) : meals;
  
      meals = availableReservations || availableReservations === "0"
        ? availableReservations === "true"
          ? meals.whereRaw("max_reservations > reservations")
          : availableReservations === "false"
            ? meals.whereRaw("max_reservations <= reservations")
            : (() => {
                res.send("Error checking available reservations");
                return meals;
              })()
        : meals;
  
      meals = title || title === "0" ? meals.where("title", "like", `%${title}%`) : meals;
      meals = dateAfter || dateAfter === "0" ? meals.where("when", ">", dateAfter) : meals;
      meals = dateBefore || dateBefore === "0" ? meals.where("when", "<", dateBefore) : meals;
      meals = limit || limit === "0" ? meals.limit(parseInt(limit)) : meals;
  
      meals = sortKey || sortKey === "0" ? meals.orderBy(sortKey, sortDir === "desc" ? "desc" : "asc") : meals;
  
      const result = await meals.select("*");
      res.json(result);
    } catch (error) {
      res.status(500).send("Error retrieving meals");
    }
  });
});

export default router;
