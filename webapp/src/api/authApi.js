import {APICreate} from './api';

export default class APIAuthCalls {
    loginUser(data) {
        return APICreate().post(`/auth/login`, data);
    }
}



