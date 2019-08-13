import Axios from 'axios'

class Api {
    constructor() {
        let request = Axios.create({
            baseURL: "http://192.168.1.106:8080/user",
            responseType: "json"
        });

        this.request = request
    }

    createUser = (user) => {
        return this.request.post(this.baseURL, user)
    }
}

const api = new Api()
export default api

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