import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/index";
import { UserContext } from "../context/UserContext";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.init";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const useAuthService = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const loggedInUser = result.user;
            console.log("loggedInUser ", loggedInUser);
            setUser(loggedInUser as User);
            navigate("/");
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error("Error during sign-out:", error);
        }
    };

    return {
        handleGoogleSignIn,
        handleSignOut,
    };
};