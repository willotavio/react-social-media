import { Post } from "./post";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import mainIcon1 from '../../../src/imgs/mainIcon1.svg';
import mainIcon2 from '../../../src/imgs/mainIcon2.svg';
import mainIcon3 from '../../../src/imgs/mainIcon3.svg';    

import { useGetPosts } from "../useGetPosts";

export const Main = () => {
    const [user] = useAuthState(auth);

    const { postsList } = useGetPosts();

    return(
        <div className="home">
           {user ? postsList?.map((post, index) => (
                <Post post={post} key={index}/>
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