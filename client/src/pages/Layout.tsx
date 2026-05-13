import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useAuthService } from "../services/authService";
import "./Layout.css";

function Layout(){
    const { handleSignOut } = useAuthService();
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
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