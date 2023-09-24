import { getDocs, collection } from "firebase/firestore"
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";
import { useAuthState } from "react-firebase-hooks/auth";

import mainIcon1 from '../../../src/imgs/mainIcon1.svg';
import mainIcon2 from '../../../src/imgs/mainIcon2.svg';
import mainIcon3 from '../../../src/imgs/mainIcon3.svg';    

export interface Post{
    id: string;
    userId: string;
    username: string;
    title: string;
    description: string;
}

export const Main = () => {
    const [user] = useAuthState(auth);
    
    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db, 'posts');

    const getPosts = async () => {
        if(user){
            try{
                const data = await getDocs(postsRef);
                // if theres a problem where the thing doesnt know what how the data needs to looks like, just cast it
                setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);
            }
            catch(err){
                console.log(err);
            }
        }
    }

    useEffect(() => {
        user?.displayName && getPosts();
    }, []);

    return(
        <div className="home">
           {user ? postsList?.map((post) => (
                <Post post={post}/>
            )) 
            : 
            <table>
                <tbody>
                    <tr>
                        <td><img src={mainIcon2} height={400}></img></td>
                        <td><h1>See what<span> you </span>like</h1></td>
                    </tr>
                    <tr>
                        <td><h1>Show what<span className='homespan'> you </span>want</h1></td>
                        <td><img src={mainIcon1} height={400}></img></td>
                    </tr>
                    <tr>
                        <td><img src={mainIcon3} height={400}></img></td>
                        <td><h1>Discover what<span> you </span>need</h1></td>
                    </tr>
                </tbody>
            </table>
            }
        </div>
    );
}