import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mealsRouter from "./api/meals.js";
import knex from "./database.js"; // Import knex using CommonJS syntax

const app = express();
const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, "../../dist/client-build");
const port = process.env.PORT || 3000;
import cors from "cors";

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/api/meals", mealsRouter);

app.get("/api/future-meals", async (req, res) => {
    const futureMeals = await knex("meals").where("when", ">", knex.fn.now());
    res.json(futureMeals || []);
});

app.get("/api/past-meals", async (req, res) => {
    const pastMeals = await knex("meals").where('when', '<', knex.raw('NOW()'));
    res.json(pastMeals || []);
});

app.get("/api/all-meals", async (req, res) => {
    const allMeals = await knex("meals").select("*");
    res.json(allMeals || []);
});

app.get("/api/first-meal", async (req, res) => {
    const firstMeal = await knex("meals").orderBy("id").first();
    if (firstMeal) {
        res.json(firstMeal);
    } else {
        res.status(404).json({ message: "No meals found" });
    }
});

app.get("/api/last-meal", async (req, res) => {
    const lastMeal = await knex("meals").orderBy("id", "desc").first();
    if (lastMeal) {
        res.json(lastMeal);
    } else {
        res.status(404).json({ message: "No meals found" });
    }
});

// app.listen(3000, () => console.log("Server running on PORT 3000"));

if (process.env.API_PATH) {
    app.use(process.env.API_PATH, router);
} else {
    throw "API_PATH is not set. Remember to set it in your .env file";
}

// For the frontend. Will first be covered in the react 
export default app;