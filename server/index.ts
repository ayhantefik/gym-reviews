import express from "express";
import cors from "cors";
import { seedGyms } from "./src/data/seed.js";
import mongoose from "mongoose";
import gymRoute from "./src/routes/gyms.ts"
import reviewRoute from "./src/routes/reviews.ts"
import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

const CONNECTION_STRING = process.env.ATLAS_URL;

console.log("CONNECTION_STRING ", CONNECTION_STRING)  

if (!CONNECTION_STRING) {
    throw new Error("CONNECTION_STRING is missing");
}

mongoose.connect(CONNECTION_STRING);

app.use("/gyms", gymRoute);
app.use("/reviews", reviewRoute);

await seedGyms();

export const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});