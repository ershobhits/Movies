const Movie = require("../models/Movie"); // ✅ Use require instead of import

const getMovies = async (req, res) => {
    try {
        const { search, sort } = req.query;
        let query = {};

        // Search logic: filter by title or description
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        // Sorting logic
        let sortOption = {};
        if (sort) {
            const sortFields = { name: "title", rating: "rating", releaseDate: "releaseDate", duration: "duration" };
            if (sortFields[sort]) {
                sortOption[sortFields[sort]] = 1; // Ascending order
            }
        }

        // Fetch movies
        const movies = await Movie.find(query).sort(sortOption);
        res.status(200).json({ movies });
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies", error: error.message });
    }
};

const addMovie = async (req, res) => {
    try {
        const { title, genre, year, rating, image, description } = req.body;

        if (!title || !genre || !year) {
            return res.status(400).json({ message: "Title, genre, and year are required" });
        }

        const newMovie = new Movie({ title, genre, year, rating, image, description });
        await newMovie.save();

        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: "Error adding movie", error: error.message });
    }
};

module.exports = { getMovies, addMovie }; // ✅ Use module.exports
