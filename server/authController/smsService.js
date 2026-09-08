const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

function sendSMS(to, body) {
  return client.messages.create({
    body,
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
  });
}

module.exports = {
  sendSMS,
};
// call this function whenever you want
//await smsService.sendSMS(to, message);
