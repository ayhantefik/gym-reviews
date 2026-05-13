import { Outlet, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useAuthService } from "../services/authService";
import {
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import app from "../firebase/firebase.init";
import type { User } from "../types";
import "./Layout.css";

function Layout(){
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { handleSignOut } = useAuthService();
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        setIsLoading(true);
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser != null){
                setUser(currentUser as User);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) return <p className="loading">Loading...</p>;
    return(
        <div className= "gym-reviews">
            <header>
                <div className="header-menu">
                    <a role="button" className="header-menu-item" onClick={() => navigate("/")}>Home</a>
                    {user && (<a role="button" className="header-menu-item" onClick={() => navigate("profile")}>Profile</a>)}
                    {user ? (
                        <a role="button" className="header-menu-item" onClick={handleSignOut}>Logout</a>
                    ) : (
                        <a role="button" className="header-menu-item" onClick={() => navigate("login")}>Login</a>
                    )}
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;