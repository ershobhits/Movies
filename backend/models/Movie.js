const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  image: { type: String, default: "https://via.placeholder.com/150" }
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;

