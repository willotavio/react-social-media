import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore"
import { useEffect, useState } from "react";

export interface Post{
    id: string;
    userId: string;
    username: string;
    title: string;
    description: string;
}

export const useGetPosts = () => {
    
    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db, 'posts');

    const getPosts = async () => {
        
        try{
            const data = await getDocs(postsRef);
            // if theres a problem where the thing doesnt know what how the data needs to looks like, just cast it
            setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    return { postsList };
}