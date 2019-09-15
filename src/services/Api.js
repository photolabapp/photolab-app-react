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