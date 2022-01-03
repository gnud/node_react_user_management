import axios from 'axios';

/*
TODO:
Create API Auth Interceptor
Along side login page/modal
Create API login method
 */
const BEARER = 'JWT';
let TOKEN = '';


export function APICreate(){
    // TODO: probably we should use Request interceptor instead :) to fetch the token
    TOKEN = localStorage.getItem('accessToken')

    const api = axios.create({
        baseURL: `/api`,
        headers: {
            'Authorization': `${BEARER} ${TOKEN}`,
        }
    });

    SessionInterceptor(api);

    return api;
}

function SessionInterceptor(api) {
    api.interceptors.response.use((response) => response, (error) => {
        if (error.request.status === 403) {
            window.location.href = '/login';
        }

        return Promise.reject(error.message);
    });
}
