require("dotenv").config({ path: "./config/.env" });

const sendGridKeyAPI = process.env.SindGridKey;
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(sendGridKeyAPI);

// Send A welcome email
exports.sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email,
    from: 'sender@email.com',
    subject: 'Thanks for joining us',
    text: `Welcome to the app, ${name}. I hope you enjoy using our product.`
  };
  
  sgMail.send(msg);
};

// Send Exit email when user delete his account
exports.sendExitEmail = (email, name) => {
  const msg = {
    to: email,
    from: 'sender@email.com',
    subject: 'Sorry to see go',
    text: `Thanks ${name}, have a nice day.`
  };
  
  sgMail.send(msg);
};