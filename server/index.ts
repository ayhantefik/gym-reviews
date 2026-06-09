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

const rawAtlasUrl = process.env.ATLAS_URL;

if (!rawAtlasUrl) {
  throw new Error("ATLAS_URL is missing");
}

function resolveMongoUrl(value: string): string {
  // AWS Secrets Manager send key/value as JSON
  if (value.trim().startsWith("{")) {
    const parsed = JSON.parse(value);

    if (!parsed.ATLAS_URL) {
      throw new Error("ATLAS_URL is missing inside secret JSON");
    }

    return parsed.ATLAS_URL;
  }
  return value;
}

const mongoUrl = resolveMongoUrl(rawAtlasUrl);

await mongoose.connect(mongoUrl);

app.use("/gyms", gymRoute);
app.use("/reviews", reviewRoute);

// Health check endpoint for load balancer
app.get("/health", (_req, res) => {
  res.status(200).send("test is ok");
});

await seedGyms();

export const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});