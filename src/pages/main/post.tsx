import { Post as IPost } from "../useGetPosts";

import likeIcon from '../../img/likeIcon.svg';
import unlikeIcon from '../../img/unlikeIcon.svg';

import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props{
    post: IPost;
}

interface Like{
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const { post } = props
    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    }
    const addLike = async () => {
        try{
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id});
            if(user){
                setLikes((prev) => prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}] : [{userId: user?.uid, likeId: newDoc.id}]);   
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const removeLike = async () => {
        try{
            const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid));
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);
            if(user){
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));   
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, [])

    return(
        <div className="post">
            <div className="head">
                <h1>{post.title}</h1>
                <hr/>
            </div>
            <div className="body">
                <p>{post.description}</p>
                <p>{post.username}</p>
            </div>
            <div className="footer">
                <img onClick={hasUserLiked ? removeLike : addLike} src={hasUserLiked ? unlikeIcon : likeIcon} height={30}/> {likes && <span>{likes?.length}</span>}
            </div>
        </div>
    );
}