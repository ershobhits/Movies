const express = require("express");
const { getMovies, addMovie } = require("../controllers/movieControllers"); // ✅ Corrected path (removed .js extension)

const router = express.Router();

// Define routes
router.get("/", getMovies); // ✅ Get all movies
router.post("/", addMovie); // ✅ Add a new movie

module.exports = router;
