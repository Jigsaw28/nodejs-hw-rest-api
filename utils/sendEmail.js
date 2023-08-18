const nodemailer = require("nodemailer");
require("dotenv").config();

const { UKRNET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: "levenko7@ukr.net",
    pass: UKRNET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendVerivicationEmail = (data) => {
  transport
    .sendMail(data)
    .then(() => console.log("Email send success"))
    .catch((error) => console.log(error));
};

module.exports = sendVerivicationEmail;
