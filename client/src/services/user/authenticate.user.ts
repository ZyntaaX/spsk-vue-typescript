import Api from '../api';
// import { type UserData } from '@/shared/stores/authentication-store';
// import { firebaseAuth } from '../authentication/firebase-client';



export async function getUserTest(token: string, external_id: string, email: string) : Promise<boolean | void> {
    // console.log("EMAIL: ", email);
    
    // try {
        await Api(token).get("/authenticate", { params: { external_id, email } })
            .then((res) => {
                console.log("RES: ", res.data);
                return true;
            })
            .catch((err) => {
                console.log("ERR:", err.response.data);
                throw err.response.data;
            })
            // console.log(data);
            
        // Promise.resolve(true)
    // } catch (error) {
    //     console.log("ERR: ", error);
    //     Promise.reject(error);
    // }
}

