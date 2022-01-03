import {APICreate} from './api';

export default class APICalls {

    getRoot() {
       return APICreate().get('/');
    }

    geUsers() {
       return APICreate().get('/user');
    }


    createUser(data) {
        return APICreate().post(`/user/`, data);
    }

    readUser(userId) {
        return APICreate().get(`/user/${userId}`);
    }

    updateUser(userId, data) {
        return APICreate().patch(`/user/${userId}`, data);
    }

    deleteUser(userId) {
       return APICreate().delete(`/user/${userId}`);
    }

}



