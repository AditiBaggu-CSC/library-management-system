const mongoose = require("mongoose");

const familyMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  relationship: { type: String, required: true },
});

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  screenshot: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  occupation: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  age: { type: Number, required: true },
  familyMembers: { type: [familyMemberSchema] },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  aadharCard: { type: String, required: true },
  aadharCardPhoto: { type: String, required: true },
  slotBooking: {
    type: String,
    required: true,
    enum: ["morning", "evening", "fullDay"],
  },
  payments: { type: [paymentSchema], required: true },
  renewalDate: { type: Date },
  seatNumber: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
