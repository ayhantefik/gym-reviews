import { Gym } from "../models/gym.js";

const gyms = [
  {
    name: "Nordic Wellness Baltzarsgatan",
    address: "Baltzarsgatan 6",
    city: "Malmö",
  },
  {
    name: "SATS City",
    address: "Studentgatan 4",
    city: "Malmö",
  },
];

export async function seedGyms() {
  const countGym = await Gym.countDocuments();

  if (countGym > 0) {
    console.log("Gyms already exists");
    return;
  }

  await Gym.insertMany(gyms);

  console.log("Gyms seedade");
}