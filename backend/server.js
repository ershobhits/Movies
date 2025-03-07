const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movieRoutes"); // ✅ Use require instead of import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.log("❌ MongoDB Connection Error:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
