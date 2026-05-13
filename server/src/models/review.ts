import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    gymId: String,
    uid: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});

export const Review = mongoose.model("Review", reviewSchema);