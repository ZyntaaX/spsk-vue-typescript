import Api from '../api';
import { mapUserModel, type UserModel } from './dto/user.dto';



export async function authenticateUserOnServer(token: string, external_id: string, email: string) : Promise<UserModel | null> {
    try {
        const response = await Api(token).get("/authenticate", { params: { external_id, email }});
        return mapUserModel(response.data)
    } catch (error: any) {
        throw error?.response?.data ?? error;
    }
}

