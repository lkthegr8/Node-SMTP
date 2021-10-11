const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

const EmailServiceCred = {
  MAIL_GUN_USER: "",
  MAIL_GUN_PASSWORD: "",
};

// middleware
app.use(cors());
app.use(express.json());

// requests
app.get("/sendOTP", async (req, res) => {
  const generatedOTP = Math.random().toString().substring(2, 8);
  let message = {
    from: "eg@gmail.com",
    to: "eg@gmail.com",
    subject: "Hi there!",
    html: `<p>thank you for contacting us. generated OPT is: </b>${generatedOTP}</b></p>`,
  };
  // below is Ethereal test acount generated manually
  //   const transporter = nodemailer.createTransport({
  //     host: "smtp.ethereal.email",
  //     port: 587,
  //     auth: {
  //       user: "santa.cruickshank1@ethereal.email",
  //       pass: "nN7F6xWxYjfyZUysAF",
  //     },
  //   });

  //   below line of code generates a test user account in Ethereal
  //   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "eg@gmail.com", // generated ethereal user
      pass: "your smtp master key", // generated ethereal password
    },
  });

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return process.exit(1);
    }
    console.log(info);
    console.log("Message sent: %s", info.messageId);
    res.end("successfull");
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
});
app.get("/", (req, res) => {
  res.end("hello");
});

// listen
app.listen(4040, () => {
  console.log("listening at port 4040");
});
