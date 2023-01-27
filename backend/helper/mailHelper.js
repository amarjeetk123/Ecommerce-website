const transporter = require("../config/transporter.config.js")
const config = require("../config/index.js")


exports.mailHelper = async (option) => {
    let message = {
        from: config.SMTP_MAIL_SENDER_EMAIL , // sender address
        to: option.email, // list of receivers
        subject:  option.subject, // Subject line
        text: option.text, // plain text body
        // html: "<b>Hello world?</b>", // html body
    }

    await transporter.sendMail(message)
}
