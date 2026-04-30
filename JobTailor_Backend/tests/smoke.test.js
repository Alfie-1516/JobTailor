import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import { vi } from "vitest";

vi.mock("../controllers/authController.js", () => ({
  loginHandler: (_req, res) => res.status(200).json({ ok: true }),
  signupHandler: (_req, res) => res.status(201).json({ ok: true }),
  logoutHandler: (_req, res) => res.status(200).json({ ok: true }),
}));

import authRoutes from "../routes/authRoutes.js";

describe("backend smoke", () => {
  it("responds on auth login route", async () => {
    const app = express();
    app.use(express.json());
    app.use("/api/auth", authRoutes);

    const response = await request(app).get("/api/auth/login");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });
});
