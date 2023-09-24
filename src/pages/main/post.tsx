import { Post as IPost } from "./main";

interface Props{
    post: IPost
}

export const Post = (props: Props) => {
    const { post } = props
    return(
        <div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <p>{post.username}</p>
        </div>
    );
}