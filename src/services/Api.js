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

export const getShipping = (cep) => {
    return axios.get("shipping/", cep)
}

export const createOrder = (user_id) => {
    return axios.get("order/", cep)
}

export const getLastOrderCreated = user_id => {
    return axios.get("order/last/created", user_id)
}