import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "./Profile.css";

function Profile(){
    const { user } = useContext(UserContext);
    return(
        <div className="profile">
            {user ? (
                <div className="user-card">
                    <img src={user.photoURL} />
                    <h3>{user.displayName}</h3>
                    <h5>{user.email}</h5>
                </div>
            ) : (
                <p>User is not logged in</p>
            )}
        </div>
    )
}

export default Profile;