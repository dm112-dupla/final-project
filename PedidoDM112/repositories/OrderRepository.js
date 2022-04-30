module.exports = class OrderRepository {
    #connection = require("../connection");

    async create(order) {
        return await this.#connection('orders').insert(order).returning("*");
    }

    async update(order) {
        return await this.#connection('orders').update(order).where('id', order.getId()).returning("*");
    }

    async search(key, value) {
        return await this.#connection('orders').where(key, value)
    }
}
