// controllers/userController.js
const User = require("../Models/User");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 587,
  secure: false,
  auth: {
    user: "monika.sharma@thecorrectsteps.com",
    pass: "Monika.sharma@1234",
  },
});

exports.sendEmail = async (req, res) => {
  const { userIds, subject, message } = req.body;

  try {
    const users = await User.find({ _id: { $in: userIds } });
    const emailAddresses = users.map((user) => user.email);

    const mailOptions = {
      from: "monika.sharma@thecorrectsteps.com",
      to: emailAddresses,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send emails" });
  }
};
