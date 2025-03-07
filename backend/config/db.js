import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Atlas connected successfully");
    } catch (error) {
        console.error("MongoDB Atlas connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
