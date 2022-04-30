const EmailLib = require("../lib/EmailLib");
const Email = require("../model/Email");

module.exports = class EmailService {

    async sendEmail(req, res) {
        const { to, subject, text } = req.body;

        const emailLib = new EmailLib();

        const email = new Email();
        email.setTo(to);
        email.setText(text);
        email.setSubject(subject);
        email.setFrom(email.getDefaultSender());


        try {
            const transporter = await emailLib.main();

            const sent = await transporter.sendMail(email);

            return res.status(200).json({
                message_id: sent.messageId,
                preview: emailLib.getPreview(sent)
            })

        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
}