import Axios from 'axios'

const axios = Axios.create({
    baseURL: "http://ec2-18-234-166-48.compute-1.amazonaws.com:8080",
    responseType: "json"
});

export const url = "http://ec2-18-234-166-48.compute-1.amazonaws.com:8080"

export const login = user => axios.post("login/", user);
export const create = user => axios.post("user/", user);
export const getShipping = cep => axios.get("shipping/", { cep: cep });
export const createOrder = user => axios.post("order/", { user: user.id });
export const upload = (order, user, photo) => axios.post("order/photo/upload", { user: user.id, order: order.id, photo: photo });
export const updateOrderToSaved = (user, order) => axios.put("order/saved", { order: order.id, user: user.id });
export const getLastOrderCreated = user => axios.get("order/last/created", { user: user.id });