import React from 'react'
import Axios from 'axios'

const axios = Axios.create({
    //baseURL: "http://ec2-34-201-70-135.compute-1.amazonaws.com:8080",
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
const getLastOrderCreated = user => axios.get("last/order/created/" + user.id );
const createAddress = address => axios.post("address", address)
const createCreditCard = creditCard => axios.post("creditCard", creditCard)
const getCreditCard = user => axios.get("creditCard/user/" + user.id);
const getCredit = user => axios.get("credit/user/" + user.id);
const getCreditTransactions = user => axios.get("credit/transactions/user/" + user.id);

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
    getShippingAddress,
    getCreditCard,
    getCredit,
    getCreditTransactions,
    createCreditCard
}