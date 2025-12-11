const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const path = require("path");
const logger = require("../configs/logger.config");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Route for sending emails
router.post("/send", (req, res) => {
  // Get the email details from the request body
  logger.info(req.body);
  const { from, to, cc, subject, text } = req.body;
  // Create a transporter object
  let transporter = nodemailer.createTransport({
    service: "gmail", // Use a specific email service provider
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL, // Your email address
      pass: process.env.PASSWORD, // Your email password
    },
    authentication: "plain",
  });

  // Define the email options
  let mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    cc: cc,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error);
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).send("Email sent successfully");
    }
  });
});

module.exports = router;
