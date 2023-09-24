import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { Post } from "./main/post";

export interface Post{
    id: string;
    userId: string;
    username: string;
    title: string;
    description: string;
}

export const Profile = () => {
    const [user] = useAuthState(auth);
    
    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db, 'posts');

    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);
    }

    useEffect(() => {
        getPosts();
    }, [])

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
                    .map((post) => (
                        <Post post={post}/>
                    ))
                }
            </div>
        </div>
        
    );
}