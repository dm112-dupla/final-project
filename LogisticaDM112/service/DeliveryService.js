const DeliveryRepository = require("../repositories/DeliveryRepository");
const OrderClient = require("../client/OrderClient");
const UtilityClient = require("../client/UtilityClient");
const Delivery = require("../model/Delivery");

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

            deli.setOrderId(order_id);

            const created = await repo.create(deli);

            if (!created.length) {
                throw new Error("Unable to save data in databank. Try again later.")
            } else {
                return res.status(200).json(created)
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

            const deli = new Delivery();
            deli.setId(search[0].id);
            deli.setOrderId(search[0].order_id);
            deli.setReceiverCpf(search[0].receiver_cpf);
            deli.setStatus(search[0].status);
            deli.setStartDate(search[0].start_date);
            deli.setEndDate(search[0].end_date);

            if (deli.getReceiverCpf() || deli.getStatus() === 2 || deli.getEndDate()) {
                throw new Error("Delivery already completed.")
            }

            if (deli.getStatus() === 0) {
                deli.setStatus(1);
                deli.setStartDate(new Date());

            } else if (deli.status === 1) {
                deli.setStatus(2);
                deli.setEndDate(new Date());

                if (!receiver_cpf) {
                    throw new Error("The receiver CPF must be informed.")
                }

                deli.setReceiverCpf(receiver_cpf);

                const oClient = new OrderClient();

                const order = await oClient.getOrderInfo(deli.getOrderId());

                const uClient = new UtilityClient();

                const email = await uClient.sendEmail(`${order.data[0].cpf}@email.com`, 
                "Your product is here!", 
                `Your product was received by ${deli.getReceiverCpf()}`);

                console.log(`See an email preview at ${email.data.preview}`);
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
