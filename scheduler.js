const cron = require("node-cron");
const { sendWhatsAppMessage } = require("./twilioConfig");

const scheduleWhatsAppMessages = () => {
  // Schedule message at 4:50 PM IST
  cron.schedule(
    `34 17 * * *`,
    () => {
      sendWhatsAppMessage("+916302312983", "Hi");
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
};

module.exports = { scheduleWhatsAppMessages };

// Execute the function to start scheduling
scheduleWhatsAppMessages();
