import { render, screen, cleanup } from "@testing-library/react";
import { describe, expect, test, afterEach } from 'vitest'
import Profile from "./Profile";
import { UserContext } from "../context/UserContext";

afterEach(() => {
    cleanup();
});

describe("Profile", () => {
    test("Shows message when user is null", () => {
        render(
            <UserContext.Provider value={{ user: null, setUser: () => {} }}>
                <Profile />
            </UserContext.Provider>
        );

        expect(screen.getByText("User is not logged in")).toBeDefined();
    });
});

describe("Profile", () => {
    test("Shows not logged in user", () => {
        render(
            <UserContext.Provider value={{ user: null, setUser: () => {} }}>
                <Profile />
            </UserContext.Provider>
        );

        expect(screen.getByText("User is not logged in")).toBeDefined();
    });
});

describe("Profile", () => {
    test("shows logged in user", () => {
        const user = {
            uid: "111",
            displayName: "Ayhan Tefik",
            email: "ayhantefik@mail.com",
            photoURL: "profile.jpg",
            accessToken: "1234"
        };

        render(
            <UserContext.Provider value={{ user: user, setUser: () => {} }}>
                <Profile />
            </UserContext.Provider>
        );

        expect(screen.getByText("Ayhan Tefik")).toBeDefined();

        expect(screen.getByText("ayhantefik@mail.com")).toBeDefined();
    });
});