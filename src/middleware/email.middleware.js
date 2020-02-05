require("dotenv").config();

const sendGridKeyAPI = process.env.SindGridKey;
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(sendGridKeyAPI);

const msg = {
    to: 'toemail@email.com',
    from: 'fromemail@email.com',
    subject: 'Twilio SendGrid Email',
    text: 'Sending with SendGrid is fun and easy to do anywhere'
  };
  
sgMail.send(msg);