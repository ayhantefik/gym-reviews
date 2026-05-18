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

describe("GET /reviews", () => {
  test("Get all reviews", async () => {
    const response = await request(app).get("/reviews");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /reviews", () => {
    test("Unauthorized test to create a review", async () => {
        const newReview = {
            gymId: "test-gymId",
            uid: "test-id",
            rating: 2
        };

        const response = await request(app).post("/reviews").send(newReview);

        expect(response.status).toBe(401);
    });

    test("Authorized test to create a review", async () => {
        const newReview = {
            gymId: "test-gymId",
            uid: "test-id",
            rating: 2
        };

        const response = await request(app)
            .post("/reviews")
            .set("Authorization", "Bearer fake-firebase-token")
            .send(newReview)
            .expect(201);

        expect(response.body).toMatchObject(newReview);
    });
});