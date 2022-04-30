const Order = require("../model/Order");
const OrderRepository = require("../repositories/OrderRepository");
const UtilityClient = require("../client/UtilityClient");
const DeliveryClient = require("../client/DeliveryClient");

module.exports = class OrderService {
    async findOrder(req, res) {
        const { id } = req.params;

        const repo = new OrderRepository();

        try {
            const search = await repo.search('id', id);

            if (!search.length) {
                throw new Error("Order not found.");
            }

            return res.status(200).json(search);

        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async createOrder(req, res) {
        const { cpf, value } = req.body;

        const repo = new OrderRepository();

        if (!cpf || !value) {
            throw new Error("You need a value and a cpf to create an order");
        }

        const order = new Order();
        order.setCpf(cpf);
        order.setValue(value);

        try {
            const create = await repo.create(order);

            if (!create.length) {
                throw new Error("Order not created");
            }

            return res.json(create);

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async patchOrder(req, res) {
        const { id } = req.params;
        const { token } = req.query;
        // resolvemos simular o pagamento como um "token",
        // que seria repassado pela instituição bancária com a confirmação do pagamento
        // aqui ele pode ser tratado como uma simples query em true & false

        try {
            const repo = new OrderRepository();

            const search = await repo.search('id', id);

            if (!search.length) {
                throw new Error("Order not found.")
            }

            const order = new Order();
            order.setId(search[0].id);
            order.setCpf(search[0].cpf);
            order.setValue(search[0].value);
            order.setStatus(search[0].status);
            order.setOrderDate(search[0].order_date);
            order.setIssueDate(search[0].issue_date);
            order.setPaymentDate(search[0].payment_date);

            const uClient = new UtilityClient();
            const dClient = new DeliveryClient();

            if (order.getStatus === 2) {
                throw new Error("Your payment has already been confirmed. Await for your delivery!")
            }

            if (order.getStatus() === 0) {
                order.setStatus(1);
                order.setIssueDate(new Date());

                const pix = await uClient.generatePix(order.getValue(), `Order nº${order.getId()}`);

                const email = await uClient.sendEmail(`${order.getCpf()}@email.com`,
                    `Order nº${order.getId()}`,
                    `Your copy/paste PIX code is already available! ${pix.data.code}`);

                console.log(`See an email preview at ${email.data.preview}`)

            } else if (order.getStatus() === 1) {
                order.setStatus(2);
                order.setPaymentDate(new Date());

                if (!token) {
                    throw new Error("Payment must be confirmed with a token.")
                }

                const deli = await dClient.createDelivery(order.getId());

                const email = await uClient.sendEmail(`${order.getCpf()}@email.com`,
                    `Order nº${order.getId()}`,
                    `Payment confirmed! Thank you for your purchase! You may accompany your delivery by the ID nº ${deli.data[0].order_id}`);

                console.log(`See an email preview at ${email.data.preview}`)
            }

            const update = await repo.update(order);

            if (!update) {
                throw new Error("Unable to save data in databank. Try again later.")
            }

            return res.status(204).send();

        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

}