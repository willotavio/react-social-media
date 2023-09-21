import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from 'react';

interface Post{
    username: string, 
    description: string,
    title: string,
    userId: string
}

export const Profile = () => {

    const [posts, setPosts] = useState<Post[]>([]);

    const getPost = async () => {    
        const query = collection(db, 'posts');
        const postsList = await getDocs(query);
        const postsArray: Post[] = []
        postsList.forEach((post) => {
            postsArray.push(post.data() as Post);
        })
        setPosts(postsArray);
        console.log(posts);
    }

    useEffect(() => {
        getPost();
    }, []);

    const [user] = useAuthState(auth);
    return(
        <div>
            <div className="profile">
                <img src={user?.photoURL || ""}></img>
                <h2>{user?.displayName}</h2>
                <p>{user?.email}</p>
                <hr/>
            </div>
            <div>
                {posts.filter((post) => post.userId === user?.uid)
                .map((post, index) => (
                    <div key={index}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <hr/>
                    </div>
                ))}
            </div>
        </div>
        
    );
}