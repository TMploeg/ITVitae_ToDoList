const API_URL = 'http://localhost:8080/';
const REQUEST_COMPLETED_STATE = 4;
const TOKEN_STORAGE_LOCATION = 'JWT';

export default class ApiService {

    static get(url, params) {
        return this.#doHttpRequest('GET', url, params);
    }

    static post(url, body, params) {
        return this.#doHttpRequest('POST', url, params, body);
    }

    static #doHttpRequest(method, url, params, body) {
        return new Promise((onSucces, onFailed) => {
            const request = new XMLHttpRequest();
            request.open(method, API_URL + url + this.#getParamString(params));
            request.setRequestHeader('accept', 'application/json');
            request.setRequestHeader('Content-Type', 'application/json');

            const authHeader = this.#getAuthHeader();
            if (authHeader !== null) {
                request.setRequestHeader('Authorization', authHeader);
            }

            request.onreadystatechange = () => {
                if (!this.#isRequestComplete(request)) {
                    return;
                }

                if (this.#isRequestSuccesfull(request)) {
                    onSucces({
                        status: request.status,
                        body: JSON.parse(request.responseText)
                    });
                }
                else {
                    onFailed({
                        status: request.status,
                        message: JSON.parse(request.responseText).detail
                    });
                }
            }

            request.send(JSON.stringify(body));
        });
    }

    static #getParamString(params) {
        if (!params || params == null) {
            return '';
        }

        const paramString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

        if (paramString.length > 0) {
            paramString = '?' + paramString;
        }

        return paramString;
    }

    static #isRequestComplete(request) {
        return request.readyState === REQUEST_COMPLETED_STATE;
    }

    static #isRequestSuccesfull(request) {
        return Math.floor(request.status / 100) === 2;
    }

    static #getAuthHeader() {
        const token = sessionStorage.getItem(TOKEN_STORAGE_LOCATION);

        if (token === null) {
            return null;
        }

        return `Bearer ${token}`;
    }
}