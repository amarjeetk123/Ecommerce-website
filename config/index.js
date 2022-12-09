const dotenv = require("dotenv")
dotenv.config()    // or require("dotenv").config()

const config = {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || "30d" ,
    PORT: process.env.PORT || 4100,
    MONGO_URI: process.env.MONGO_URI,
    SMTP_MAIL_HOST: process.env.SMTP_MAIL_HOST,
    SMTP_MAIL_PORT: process.env.SMTP_MAIL_PORT,
    SMTP_MAIL_USERNAME: process.env.SMTP_MAIL_USERNAME,
    SMTP_MAIL_PASSWORD: process.env.SMTP_MAIL_PASSWORD,
    SMTP_MAIL_SENDER_EMAIL: process.env.SMTP_MAIL_SENDER_EMAIL,

}

module.exports = config ;

