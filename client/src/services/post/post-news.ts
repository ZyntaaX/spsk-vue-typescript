import api from "../api";
// import { mapUserModel, type UserModel } from "./dto/user.dto";
import { firebaseAuth } from "../authentication/firebase-client";
import { type PostModel, mapPostModel } from './dto/post.dto';

export async function postNews(title: string, subheader: string, content: string, publish: boolean, postID?: string): Promise<PostModel | null> {
    try {
        const token = await firebaseAuth.currentUser?.getIdToken(true);
        const response = await api(token).post('/post/news', {
            title, subheader, content, publish, postID
        });
        console.log("response: ", response.data);
        
        return mapPostModel(response.data)
    } catch (error: any) {
        throw error.code ?? error.error ?? error;
    }
}

