const axios = require("axios")

module.exports = class UtilityClient {
    baseUrl = "http://localhost:4000/api"

    async getOrderInfo(order_id) {
        return await axios.get(`${this.baseUrl}/order/${order_id}`);
    }
}