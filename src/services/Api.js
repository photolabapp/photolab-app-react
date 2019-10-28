import Axios from 'axios'

const axios = Axios.create({
    baseURL: "http://ec2-18-234-166-48.compute-1.amazonaws.com:8080",
    responseType: "json"
});

export const login = user => {
    return axios.post("login/", user)
}

export const create = user => {
    return axios.post("user/", user)
}

export const getShipping = cep => {
    return axios.get("shipping/", { cep: cep })
}

export const createOrder = user => {
    return axios.post("order/", { user: user.id })
}

export const upload = (order, user, photo) => {
    return axios.post("order/photo/upload", { user: user.id, order: order.id, photo: photo })
}

export const updateOrderToSaved = (user, order) => {
    return axios.put("order/saved", { order: order.id, user: user.id })
}

export const getLastOrderCreated = user => {
    return axios.get("order/last/created", { user: user.id })
}