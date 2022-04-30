const axios = require("axios")

module.exports = class DeliveryClient {
    baseUrl = "http://localhost:3000/api/delivery"

    async createDelivery(id) {
        return await axios.post(`${this.baseUrl}/${id}`);
    }
}