const DeliveryRepository = require("../repositories/DeliveryRepository");
const Delivery = require("../model/Delivery")

module.exports = class DeliveryService {
    async postNewDelivery(req, res) {
        const { order_id } = req.params;

        try {
            const repo = new DeliveryRepository();

            const search = await repo.search('order_id', order_id);

            if (search.length) {
                throw new Error("There is already a delivery for this order.")
            }

            const deli = new Delivery();

            deli.order_id = order_id;

            const create = await repo.create(deli);


            if (!create.length) {
                throw new Error("Unable to save data in databank. Try again later.")
            } else {
                return res.status(200).json("Delivery saved")
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }


    }

    async listDeliveries(req, res) {
        const { filter, value } = req.query;

        try {
            const repo = new DeliveryRepository();

            if (filter && value) {

                const validFilters = await repo.getColumnNames();

                const filterFound = validFilters.find(value => value === filter);

                if (!filterFound) {
                    throw new Error("The specified filter does not exist.")
                }

                const filteredDeliveries = await repo.search(filter, value);

                if (!filteredDeliveries.length) {
                    throw new Error("Filtered deliveiries not found.")
                }

                return res.status(200).json(filteredDeliveries);
            } else if (filter & !value) {

                throw new Error("No value for filtering.")
            } else if (value) {

                throw new Error("No filter for filtering.")
            }

            const allDeliveries = await repo.listAll();

            if (!allDeliveries.length) {
                throw new Error("Unfiltered deliveries not found.")
            }

            return res.json(allDeliveries);
        } catch (error) {
            return res.status(400).json({ message: error.message })

        }


    }

    async patchDelivery(req, res) {
        const { id } = req.params;
        const { receiver_cpf } = req.query;

        try {
            const repo = new DeliveryRepository();

            const search = await repo.search('id', id);

            if (!search.length) {
                throw new Error("Delivery not found.")
            }

            const deli = search[0];

            if (deli.receiver_cpf || deli.status === 2 || deli.enddate) {
                throw new Error("Delivery already completed.")
            }

            if (deli.status === 0) {
                deli.status++;
                deli.startdate = new Date();

            } else if (deli.status === 1) {
                deli.status++;
                deli.enddate = new Date();

                if (!receiver_cpf) {
                    throw new Error("The receiver CPF must be informed.")
                }

                deli.receiver_cpf = receiver_cpf;
            }

            const update = await repo.updateDelivery(deli);

            if (!update) {
                throw new Error("Unable to save data in databank. Try again later.")
            }

            return res.status(204).send();

        } catch (error) {
            res.status(400).json({ message: error.message })
        }


    }
}
