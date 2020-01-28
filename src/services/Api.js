import React from 'react'
import Axios from 'axios'

const axios = Axios.create({
    //baseURL: "http://ec2-54-173-117-10.compute-1.amazonaws.com:8080",
    baseURL: "http://192.168.0.7:8080/",
    responseType: "json"
});

const url = "http://ec2-18-234-166-48.compute-1.amazonaws.com:8080"

const login = user => axios.post("login/", user);
const create = user => axios.post("user/", user);
const getShipping = cep => axios.get("shipping/", { cep: cep });
const getShippingAddress = user => axios.get("shipping/address/user/" + user.id);
const createOrder = user => axios.post("order/", { user: user.id });
const upload = (order, user, photo) => axios.post("photo/upload", { user: user.id, order: order.id, photo: photo });
const updateOrderToSaved = (user, order) => axios.put("order/", { order: order.id, user: user.id });
const getLastOrderCreated = user => axios.get("last/order/created", { user: user.id });
const createAddress = address => axios.post("address/", address)

export {
    login,
    create,
    getShipping,
    createOrder,
    upload,
    updateOrderToSaved,
    getLastOrderCreated,
    createAddress,
    url,
    getShippingAddress
}