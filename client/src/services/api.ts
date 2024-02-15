import axios from 'axios';
// import { firebaseAuth } from './authentication/firebase-client';

export default (token?: string) => {
    // if (requiresAuth) {
    //     firebaseAuth.currentUser?.getIdToken(true)
    //     .then((token) => {
            // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
            // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

            // axios.interceptors.response.use(
            //     (response) => response,
            //     (error) => {
            //         console.log("ERROR::::", error);
            //         return Promise.reject(error);
            //     }
            // )
            // const ContentType = contentType ?? undefined;
            return axios.create({
                baseURL: import.meta.env.VITE_SERVER_BASE_URL,
                headers: {
                    'Authorization': token,
                },
                
                // withCredentials: false,
                
            })
        // })
    //     .catch((error) => {
    //         console.error("Error fetching Firebase token:", error)
    //     })
    // } else {
    //     return axios.create({
    //         baseURL: import.meta.env.VITE_SERVER_BASE_URL,
    //     })
    // }
};
