const express = require("express");
const router = express.Router();
const userController = require("../Controllers/EmailController");

router.post("/send/email", userController.sendEmail);

module.exports = router;
