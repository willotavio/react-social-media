import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useGetPosts } from "./useGetPosts";
import { Post } from "./main/post";

export const Profile = () => {
    const [user] = useAuthState(auth);

    const { postsList } = useGetPosts();

    return(
        <div>
            <div className="profile">
                <img src={user?.photoURL || ""}></img>
                <h2>{user?.displayName}</h2>
                <p>{user?.email}</p>
                <hr/>
            </div>
            <div>
                {
                    postsList?.filter((post) => post.userId === user?.uid)
                    .map((post, index) => (
                        <Post post={post} key={index}/>
                    ))
                }
            </div>
        </div>
        
    );
}