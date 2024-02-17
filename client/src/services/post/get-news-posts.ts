import api from "../api";
// import { mapUserModel, type UserModel } from "./dto/user.dto";
// import { firebaseAuth } from "../authentication/firebase-client";
import { type PostModel, mapPostModel } from './dto/post.dto';

export async function getAllNewsPosts(): Promise<PostModel[] | null> {
    try {
        // const token = await firebaseAuth.currentUser?.getIdToken(true);
        const response = await api().get('/post/news');
        // console.log("response: ", response);
        
        const posts: PostModel[] = []
        if (response.data.length > 0) {
            response.data.forEach((post: any) => {
                posts.push(mapPostModel(post))
            })
        }

        return posts;
    } catch (error: any) {
        throw error.code ?? error.error ?? error;
    }
}

