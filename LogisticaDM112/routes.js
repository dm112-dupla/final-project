const express = require("express");
const DeliveryService = require("./service/DeliveryService")
const { postNewDelivery, listDeliveries, patchDelivery } = new DeliveryService();

const routes = express();

const baseUrl = "/api/delivery";

routes.get(`${baseUrl}`, listDeliveries);
routes.post(`${baseUrl}/:order_id`, postNewDelivery);
routes.patch(`${baseUrl}/:id`, patchDelivery);


module.exports = routes;
