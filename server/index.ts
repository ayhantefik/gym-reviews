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

console.log("ATLAS_URL raw:", rawAtlasUrl);

if (!rawAtlasUrl) {
  throw new Error("ATLAS_URL is missing");
}

function resolveMongoUrl(value: string): string {
  // AWS Secrets Manager key/value kan komma som JSON:
  // {"ATLAS_URL":"mongodb+srv://..."}
  if (value.trim().startsWith("{")) {
    const parsed = JSON.parse(value);

    if (!parsed.ATLAS_URL) {
      throw new Error("ATLAS_URL is missing inside secret JSON");
    }

    return parsed.ATLAS_URL;
  }

  // Lokalt .env:
  // ATLAS_URL=mongodb+srv://...
  return value;
}

const mongoUrl = resolveMongoUrl(rawAtlasUrl);

await mongoose.connect(mongoUrl);

app.use("/gyms", gymRoute);
app.use("/reviews", reviewRoute);

await seedGyms();

export const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});