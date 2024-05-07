import ApiService, { TOKEN_STORAGE_LOCATION } from "./ApiService";

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
}