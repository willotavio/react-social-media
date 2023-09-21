import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import createPostIcon1 from '../../imgs/createPostIcon1.svg';

interface CreateFormData{
    title: string,
    description: string
}

export const CreateForm = () => {

    const [user] = useAuthState(auth);

    const schema = yup.object().shape({
        title: yup.string().required("Add a title"),
        description: yup.string().required("Add a description")
    });

    const { register, handleSubmit, reset, formState:{ errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })

    const postRef = collection(db, 'posts');

    const onCreatePost = async (data: CreateFormData) => {
        try{
            await addDoc(postRef, {
                title: data.title,
                description: data.description,
                username: user?.displayName,
                userId: user?.uid
            });
            console.log("Post created");
        }
        catch(err){
            console.log(err);
        }
        
        reset();
    }

    return(
        <table className="newPostTable">
            <tr>
                <td>
                    <h1>Create a new post</h1>
                    <form onSubmit={handleSubmit(onCreatePost)} className="newPostForm">
                        <input type="text" {...register("title")} placeholder="Title"/>
                        <span>{errors.title?.message}</span>
                        <textarea {...register("description")} placeholder="Description" />
                        <span>{errors.description?.message}</span>
                        <input type="submit" value="Post" />
                    </form>
                </td>
                <td><img src={createPostIcon1} height={400}/></td>
            </tr>
        </table>
    );
}