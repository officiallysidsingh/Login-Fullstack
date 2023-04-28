const nodemailer = require("nodemailer");
const MailGen = require("mailgen");
require("dotenv").config();

// https://ethereal.email/create
let nodeconfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

let transporter = nodemailer.createTransport(nodeconfig);

let MailGenerator = new MailGen({
  theme: "default",
  product: {
    name: "MailGen",
    link: "https://mailgen.js/",
  },
});

/*
    @desc    Send A Mail To The User After Registration
    
    @route   POST /api/registerMail

    @param: {
        "username": "example123",               !Required and Unique
        "userEmail": "example@gmail.com",       !Required
        "text": "",                             Optional
        "subject": ""                           Optional
    }
*/
const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // Body of the email
  let email = {
    body: {
      name: username,
      intro: text || "Welcome to Siddharth's Project!",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  let emailBody = MailGenerator.generate(email);

  let message = {
    from: "Siddharth's Project",
    to: userEmail,
    subject: subject || "Welcome to Siddharth's Project!",
    html: emailBody,
  };

  await transporter
    .sendMail(message)
    .then(() => {
      res.status(200).json({ message: "Email sent successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Email not sent", error: err });
    });
};

module.exports = registerMail;
