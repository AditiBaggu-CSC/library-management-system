const twilio = require("twilio");

//const accountSid = "ACb9f5b73062e62c6ca54631af6837aff1";
//const authToken = "676c7b2d110f1fec17e535c326520979";
const client = new twilio(accountSid, authToken);

// Ensure this is a verified Twilio WhatsApp number
client.messages
  .create({
    body: "Your appointment is coming up on July 21 at 3PM",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+916302312983",
  })
  .then((message) => console.log(message.sid));

