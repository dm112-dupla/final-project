module.exports = class Email {
    #defaultSender = '"DM112ServicesAndOOP <noreply@dm112.com>"';

    setFrom(from) {
        this.from = from;
    }
    setTo(to) {
        this.to = to;
    }
    setSubject(subject) {
        this.subject = subject;
    }
    setText(text) {
        this.text = text;
    }
    getDefaultSender() {
        return this.#defaultSender;
    }
    getFrom() {
        return this.from;
    }
    getTo() {
        return this.to;
    }
    getSubject() {
        return this.subject;
    }
    getText() {
        return this.text;
    }
}