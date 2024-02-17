import Api from '../api';
import { mapUserModel, type UserModel } from './dto/user.dto';
import { getProfileImage } from './profile-image';



export async function authenticateUserOnServer(token: string, external_id: string, email: string) : Promise<UserModel | null> {
    try {
        const response = await Api(token).get("/authenticate", { params: { external_id, email }});
        const user: UserModel = mapUserModel(response.data)

        if (user?.profile_picture_id) {
            user.profile_picture_url = await getProfileImage(user?.profile_picture_id ?? "");
        } else if (user) {
            user.profile_picture_url = '/src/assets/default_pp.jpg';
        }

        return user;
    } catch (error: any) {
        throw error?.response?.data ?? error;
    }
}
