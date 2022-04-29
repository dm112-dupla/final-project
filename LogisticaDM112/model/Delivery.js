module.exports = class Delivery {
    //statusEnum = 0 created, 1 delivering, 2 delivered

    //   constructor(id, order_id, receiver_cpf, status, startDate, endDate){
    //       this.id = id
    //       this.order_id = order_id
    //       this.receiver_cpf = receiver_cpf
    //       this.status = status
    //       this.startDate = startDate
    //       this.endDate = endDate
    //   }

    setId(id) {
        this.id = id;
    }

    setOrderId(order_id) {
        this.order_id = order_id;
    }

    setReceiverCpf(receiver_cpf) {
        this.receiver_cpf = receiver_cpf;
    }

    setStatus(status) {
        this.status = status;
    }

    setStartDate(start_date) {
        this.start_date = start_date;
    }

    setEndDate(end_date) {
        this.end_date = end_date;
    }

    getId() {
        return this.id;
    }

    getOrderId() {
        return this.order_id;
    }

    getReceiverCpf() {
        return this.receiver_cpf;
    }

    getStatus() {
        return this.status;
    }

    getStartDate() {
        return this.start_date;
    }

    getEndDate() {
        return this.end_date;
    }

}
