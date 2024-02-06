// import { AxiosPromise, AxiosRequestConfig } from 'axios';
import Api from '../api';

// type User = {
//     id: string;
//     name: string;
//     registeredAt: string; // Change to timestamp later on
// } | undefined;

export async function getUserByID(id: string) : Promise<void> {
    await Api().get(`/user/${id}`)
    .then((response: any) => {
        console.log("WE GOT RESPONSE: ", response);
    })
    .catch((error) => {
        console.log("CAUGHT ERROR: ", error);
    })
}
