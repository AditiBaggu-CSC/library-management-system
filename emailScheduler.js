const cron = require("node-cron");
const nodemailer = require("nodemailer");
const User = require("./Models/User"); // Adjust the path as necessary

// Configure nodemailer transporter for Hostinger
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 587,
  secure: false,
  auth: {
    user: "no-reply_erp@thecorrectsteps.com", // Replace with your Outlook email
    pass: "Sajaljain@390", // Replace with your Outlook password
  },
});

const sendEmailReminder = async (user, daysUntilRenewal) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email, // Ensure user document has an 'email' field
    subject: "Modern Study Library Subscription Renewal Reminder",
    text: `Dear ${user.name}, 
    your renewal date is in ${daysUntilRenewal} day(s). Please renew your subscription using the below link.
    https://modern-study-library.thecorrectsteps.com/monthly/payment.
    
    Thank You for choosing Modern Study Library`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${user.email}`);
  } catch (err) {
    console.error(`Failed to send email to ${user.email}:`, err);
  }
};

const checkRenewalDates = async () => {
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(currentDate.getDate() + 7);
  const formattedSevenDaysFromNow = sevenDaysFromNow
    .toISOString()
    .split("T")[0];

  console.log(
    "Checking renewal dates from",
    formattedCurrentDate,
    "to",
    formattedSevenDaysFromNow
  );

  try {
    const user = await User.find({});
    console.log(user);
    const users = await User.find({
      renewalDate: {
        $gte: formattedCurrentDate,
        $lte: formattedSevenDaysFromNow,
      },
    });

    console.log("Found users:", users); // Add logging to check users found

    for (const user of users) {
      const renewalDate = new Date(user.renewalDate);
      const daysUntilRenewal = Math.ceil(
        (renewalDate - currentDate) / (1000 * 60 * 60 * 24)
      );

      if (daysUntilRenewal <= 7) {
        console.log("Sending email reminder to", user.email);
        await sendEmailReminder(user, daysUntilRenewal);
      }
    }
  } catch (err) {
    console.error("Error checking renewal dates:", err);
  }
};

const scheduleEmailReminders = () => {
  // Schedule the function to run daily at 6:05 PM
  cron.schedule("00 09 * * *", checkRenewalDates);
};

module.exports = { scheduleEmailReminders };
