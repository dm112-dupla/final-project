const express = require("express");
const EmailService = require("./services/EmailService");
const PixService = require("./services/PixService");

const { sendEmail } = new EmailService();
const { generatePix } = new PixService(); 

const routes = express();

const baseUrl = "/api";

routes.post(`${baseUrl}/email`, sendEmail);
routes.get(`${baseUrl}/pix`, generatePix);


module.exports = routes;
