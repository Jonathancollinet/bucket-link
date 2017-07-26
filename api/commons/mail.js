const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8c90382a4a0751",
    pass: "76ce45a337b2e2"
  }
})

module.exports = transport
