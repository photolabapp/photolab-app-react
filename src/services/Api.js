import Axios from 'axios'

const axios = Axios.create({
    baseURL: "http://192.168.43.50:8080",
    responseType: "json"
});

export const login = (user) => {
    return axios.post("login/", user)
}

export const create = (user) => {
    return axios.post("user/", user)
}

/*
class Api {
    constructor() {
        let request = Axios.create({
            baseURL: "http://192.168.1.106:8080",
            responseType: "json"
        });

        this.request = request
    }

    post = (path, obj) => {
        return this.request.post(path, obj)
    }

    createUser = (user) => {
        //return this.request.post("/user", user)
        return this.post("/user", user)
    }

    doLogin = (user) => {
        console.log(user)
        return this.post("/login", user)
    }
}

//const api = new Api()
export default Api
*/

/*

// Make a request for a user with a given ID
axios.get('/user?ID=12345')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

// Optionally the request above could also be done as
axios.get('/user', {
    params: {
        ID: 12345
    }
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
    try {
        const response = await axios.get('/user?ID=12345');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
Î
*/