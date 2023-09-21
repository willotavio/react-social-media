import mainIcon1 from '../../src/imgs/mainIcon1.svg';
import mainIcon2 from '../../src/imgs/mainIcon2.svg';
import mainIcon3 from '../../src/imgs/mainIcon3.svg';

import { useState, useEffect } from 'react';
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Post{
    username: string, 
    description: string,
    title: string,
    userId: string
}

export const Main = () => {
    const [user] = useAuthState(auth);

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
    return(
        <div>
            <div className='home'>
                { user? 
                <div>
                    {posts.map((post, index) => (
                        <div key={index}>
                            <p>{post.username}</p>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                        </div>
                    ))}
                </div>
                : <table>
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
                </table>}
                
            </div>
        </div>
    );
}