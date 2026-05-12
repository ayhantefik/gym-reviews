import mongoose from "mongoose";

const gymSchema = new mongoose.Schema({
    name: String,
    city: String,
    address: String
});

export const Gym = mongoose.model("Gym", gymSchema);