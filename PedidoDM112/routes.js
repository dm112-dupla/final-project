const express = require("express");
const OrderService = require("./services/OrderService");
const { findOrder, createOrder, patchOrder } = new OrderService();

const routes = express();

const baseUrl = "/api/order";



routes.get(`${baseUrl}/:id`, findOrder);
routes.post(`${baseUrl}`, createOrder);
routes.patch(`${baseUrl}/:id`, patchOrder);


module.exports = routes;
