import express from "express";
import cors from "cors";
import { seedGyms } from "./src/data/seed.js";
import mongoose from "mongoose";
import gymRoute from "./src/routes/gyms.ts"
import reviewRoute from "./src/routes/reviews.ts"

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/gym-reviews-db");

app.use("/gyms", gymRoute);
app.use("/reviews", reviewRoute);

async function startServer() {

  await seedGyms();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();