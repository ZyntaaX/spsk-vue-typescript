import api from "../api";
// import { mapUserModel, type UserModel } from "./dto/user.dto";
import { firebaseAuth } from "../authentication/firebase-client";
// import * as CookieService from '@/services/cookies/cookies.service';

export async function uploadUserProfileImage(userID: string, formData: FormData): Promise<string> {
    try {
        const token = await firebaseAuth.currentUser?.getIdToken(true);
        const response = await api(token).post(`/image-upload/profile-image/${userID}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            responseType: "arraybuffer"
        });
        
        console.log(response);
        const blob = new Blob([response.data], { type: 'image/jpeg' })

        return URL.createObjectURL(blob);
    } catch (error: any) {
        throw error.code ?? error.error ?? error;
    }
}

export async function getProfileImage(imageID: string) : Promise<string> {
    try {
        const response = await api().get(`/image-upload/image/${imageID}`, {
            responseType: "arraybuffer"
        })


        const blob = new Blob([response.data], { type: 'image/jpeg' })

        const picUrl = URL.createObjectURL(blob);

        return picUrl;
    } catch (error: any) {
        throw error.code ?? error.error ?? error;
    }
}