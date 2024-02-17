import api from "../api";
import { mapUserModel, type UserModel } from "./dto/user.dto";
import { firebaseAuth } from "../authentication/firebase-client";
import { getProfileImage } from ".";

export async function getUserByID(userID: string): Promise<UserModel | null> {
    try {
        const token = await firebaseAuth.currentUser?.getIdToken();
        const response = await api(token).get(`/user/${userID}`);
        
        const user: UserModel = mapUserModel(response.data)

        if (user?.profile_picture_id) {
            user.profile_picture_url = await getProfileImage(user?.profile_picture_id ?? "");
        } else if (user) {
            user.profile_picture_url = '/src/assets/default_pp.jpg';
        }

        return user;
    } catch (error: any) {
        throw error.code ?? error.error ?? error;
    }
}