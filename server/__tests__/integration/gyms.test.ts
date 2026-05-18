import { describe, test, expect, afterAll, vi } from 'vitest';
import request from "supertest";
import mongoose from "mongoose";
import { app, server } from "../../index";

vi.mock("firebase-admin", () => ({
  default: {
    apps: [],
    initializeApp: vi.fn(),
    credential: {
        cert: vi.fn(),
    },
    auth: () => ({
      verifyIdToken: vi.fn().mockResolvedValue({
        uid: "test-user-id",
        email: "test@mail.com",
      }),
    }),
  },
}));

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe("GET /gyms", () => {
  test("Get all gyms", async () => {
    const response = await request(app).get("/gyms");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /gyms", () => {
    test("Unauthorized test to create a new gym", async () => {
        const newGym = {
            name: "SATS Triangeln",
            city: "Malmö",
            address: "St Johannesgatan 1"
        };

        const response = await request(app).post("/gyms").send(newGym);

        expect(response.status).toBe(401);
    });

    test("Authorized test to create a new gym", async () => {
        const newGym = {
            name: "SATS Triangeln",
            city: "Malmö",
            address: "St Johannesgatan 1"
        };

        const response = await request(app)
            .post("/gyms")
            .set("Authorization", "Bearer fake-firebase-token")
            .send(newGym)
            .expect(201);

        expect(response.body).toMatchObject(newGym);
    });
});