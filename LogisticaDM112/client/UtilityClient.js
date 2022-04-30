const axios = require("axios")

module.exports = class UtilityClient {
    baseUrl = "http://localhost:5000/api"

    async sendEmail(to, subject, text) {
        return await axios.post(`${this.baseUrl}/email`, {
            to, subject, text
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}