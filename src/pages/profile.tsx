import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Profile = () => {
    const [user] = useAuthState(auth);
    return(
        <div>
            <div className="profile">
                <div className="dot"></div>
                <img src={user?.photoURL || ""}></img>
            </div>
            <hr/>
            <div>
                <h2>{user?.displayName}</h2>
                <p>{user?.email}</p>
            </div>
        </div>
        
    );
}