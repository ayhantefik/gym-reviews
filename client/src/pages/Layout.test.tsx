import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";
import { UserContext } from "../context/UserContext";

afterEach(() => {
    cleanup();
});

const user = {
  uid: "111",
  displayName: "Ayhan Tefik",
  email: "ayhantefik@mail.com",
  photoURL: "profile.jpg",
  accessToken: "1234"
};

vi.mock("../services/authService", () => ({
  useAuthService: () => ({
    handleSignOut: vi.fn(),
  })
}));

vi.mock("firebase/auth", () => ({
  getAuth: () => ({}),
  onAuthStateChanged: (_auth: unknown, callback: Function) => {
    callback({ user });

    return () => {};
  },
}));

describe("Layout", () => {
  test("Shows loged user menu", async () => {
    
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: user, setUser: vi.fn() }}>
          <Layout />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(await screen.findByText("Home")).toBeDefined();
    expect(await screen.findByText("Profile")).toBeDefined();
    expect(await screen.findByText("Logout")).toBeDefined();
  });
});

describe("Layout", () => {
  test("Shows not loged user menu", async () => {
    
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, setUser: vi.fn() }}>
          <Layout />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(await screen.findByText("Home")).toBeDefined();
    expect(await screen.findByText("Login")).toBeDefined();
  });
});