import api from "../api";
import { mapUserModel, type UserModel } from "./dto/user.dto";
import { firebaseAuth } from "../authentication/firebase-client";

export async function getUserByID(userID: string): Promise<UserModel | null> {
    try {
        const token = await firebaseAuth.currentUser?.getIdToken();
        const response = await api(token).get(`/user/${userID}`);
        return mapUserModel(response.data)
    } catch (error: any) {
        throw error.code ?? error.error ?? error;
    }
}