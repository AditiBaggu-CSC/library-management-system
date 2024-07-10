const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  registrationImage: { type: String, required: true },
  paymentsImage: { type: String, required: true },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
