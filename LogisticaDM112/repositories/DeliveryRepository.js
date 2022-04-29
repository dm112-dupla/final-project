module.exports = class DeliveryRepository {
    #connection = require("../connection");

    async create(delivery) {
        return await this.#connection('deliveries').insert(delivery).returning("*");
    }

    async listAll() {
        return await this.#connection('deliveries');
    }

    async search(key, value) {
        return await this.#connection('deliveries').where(key, value);
    }

    async getColumnNames() {
        const { rows } = await this.#connection.raw("SELECT json_object_keys(to_json((SELECT t FROM public.deliveries t LIMIT 1)))"); 0
        return rows.map(obj => obj = obj.json_object_keys);
    }

    async updateDelivery(delivery) {
        return await this.#connection('deliveries').update(delivery).where('id', delivery.id).returning("*");
    }
}
