import { Post as IPost } from "../useGetPosts";

interface Props{
    post: IPost;
}

export const Post = (props: Props) => {
    const { post } = props
    return(
        <div className="post">
            <h1>{post.title}</h1>
            <hr/>
            <p>{post.description}</p>
            <p>{post.username}</p>
        </div>
    );
}