// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const { sendgridApiKey } = require("../config/keys");
const sgMail = require("@sendgrid/mail");
console.log(sendgridApiKey);
sgMail.setApiKey(sendGridKey);
const msg = {
  to: "ashishtayal14@gmail.com",
  from: "atayal@xebia.com",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>"
};
sgMail.send(msg);
