module.exports = class Order {
    //statusEnum = {"filled": 0, "pending": 1, "confirmed": 2};

    setId(id){
        this.id = id;
    }
    setCpf(cpf){
        this.cpf = cpf;
    }
    setValue(value) {
        this.value = value;
    }
    setStatus(status) {
        this.status = status;
    }
    setOrderDate(order_date) {
        this.order_date = order_date;
    }
    setIssueDate(issue_date) {
        this.issue_date = issue_date;
    }
    setPaymentDate(payment_date){
        this.payment_date = payment_date;
    }

    getId(){
        return this.id;
    }
    getCpf(){
        return this.cpf;
    }
    getValue() {
        return this.value;
    }
    getStatus() {
        return this.status;
    }
    getOrderDate() {
        return this.order_date;
    }
    getIssueDate() {
        return this.issue_date;
    }
    getPaymentDate(){
        return this.payment_date;
    }


}