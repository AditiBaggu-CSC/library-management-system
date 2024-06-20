const mongoose = require("mongoose");

const familyMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  relationship: { type: String, required: true },
});

const previousResidenceSchema = new mongoose.Schema({
  address: { type: String, required: true },
  dateOfLeaving: { type: Date, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  occupation: { type: String, required: true },
  officePhoneNumber: { type: String, required: true },
  age: { type: Number, required: true },
  familyMembers: [familyMemberSchema],
  presentAddress: { type: String, required: true },
  previousResidence: [previousResidenceSchema],
  permanentAddress: { type: String, required: true },
  telephoneNumber: { type: String, required: true },
  aadharCard: { type: String, required: true },
  aadharCardPhoto: { type: String, required: true }, 
  governmentIdentificationProof: { type: String, required: true }, 
});

const User = mongoose.model("User", userSchema);

module.exports = User;
