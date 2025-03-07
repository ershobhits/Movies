import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, default: "user" } // 'admin' or 'user'
}, { timestamps: true });

export default mongoose.model("User", userSchema);
