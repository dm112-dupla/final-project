const nodemailer = require("nodemailer");

module.exports = class EmailLib{
    async main() {
        let testAccount = await nodemailer.createTestAccount();
      
        return nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass
          },
        });
      }
    
      getPreview(email) {
        nodemailer.getTestMessageUrl(email)
      }
}
