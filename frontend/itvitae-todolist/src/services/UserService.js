import ApiService, { TOKEN_STORAGE_LOCATION } from "./ApiService";

const USERNAME_STORAGE_LOCATION = 'USERNAME';

export default class UserService {
    static login(username, password) {
        return ApiService
            .post(
                'auth/login',
                {
                    username: username,
                    password: password
                }
            )
            .then(
                response => {
                    sessionStorage.setItem(TOKEN_STORAGE_LOCATION, response.body.token);
                    sessionStorage.setItem(USERNAME_STORAGE_LOCATION, response.body.username);
                    return Promise.resolve({
                        succes: true
                    });
                },
                error => Promise.resolve({
                    succes: false,
                    message: error.message
                })
            );
    }

    static logout() {
        sessionStorage.removeItem(TOKEN_STORAGE_LOCATION);
    }

    static register(username, password) {
        return ApiService
            .post(
                'auth/register',
                {
                    username: username,
                    password: password
                }
            )
            .then(
                response => {
                    return Promise.resolve({
                        succes: true
                    })
                },
                error => {
                    return Promise.resolve({
                        succes: false,
                        message: error.message
                    })
                }
            );
    }

    static isLoggedIn() {
        return sessionStorage.getItem(TOKEN_STORAGE_LOCATION) !== null;
    }

    static getUsername() {
        return sessionStorage.getItem(USERNAME_STORAGE_LOCATION);
    }
}