import mongoose from "mongoose";

const gymReviewSchema = new mongoose.Schema({
    gymId: Number,
    userId: Number,
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});

export const gymReview = mongoose.model("GymReview", gymReviewSchema);