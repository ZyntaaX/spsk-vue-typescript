import axios from 'axios';

export default () => {
    return axios.create({
        // Gives error in IDE but should work anyways
        baseURL: import.meta.env.VITE_SERVER_BASE_URL,
    })
};
