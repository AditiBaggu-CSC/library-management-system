const { validationResult } = require("express-validator");
const User = require("../Models/User");
const HttpError = require("../Middleware/http-error");

// Create a new user
const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Invalid inputs passed, please try again",
      errors: errors.array(),
    });
  }

  const {
    name,
    fatherName,
    occupation,
    phoneNumber,
    age,
    familyMembers,
    presentAddress,
    permanentAddress,
    aadharCard,
    aadharCardPhoto,
    slotBooking,
    paymentAmount,
    paymentScreenshot,
  } = req.body;

  try {
    let existingUser = await User.findOne({ aadharCard });

    if (existingUser) {
      return res.status(422).json({ message: "User already exists" });
    }

    const createdUser = new User({
      name,
      fatherName,
      occupation,
      phoneNumber,
      age,
      familyMembers,
      presentAddress,
      permanentAddress,
      aadharCard,
      aadharCardPhoto,
      slotBooking,
      payments: [
        {
          amount: paymentAmount,
          screenshot: paymentScreenshot,
        },
      ],
    });

    await createdUser.save();

    res.status(201).json({
      userId: createdUser._id,
      name: createdUser.name,
      fatherName: createdUser.fatherName,
      occupation: createdUser.occupation,
      phoneNumber: createdUser.phoneNumber,
      age: createdUser.age,
      familyMembers: createdUser.familyMembers,
      presentAddress: createdUser.presentAddress,
      permanentAddress: createdUser.permanentAddress,
      aadharCard: createdUser.aadharCard,
      aadharCardPhoto: createdUser.aadharCardPhoto,
      slotBooking: createdUser.slotBooking,
      payments: createdUser.payments,
    });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Database error", 500));
  }
};

// Create a monthly payment
const createMonthlyPayment = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Invalid inputs passed, please try again",
      errors: errors.array(),
    });
  }

  const { phoneNumber, paymentAmount, paymentScreenshot } = req.body;

  try {
    let user = await User.findOne({ phoneNumber: phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.payments.push({
      amount: paymentAmount,
      screenshot: paymentScreenshot,
    });

    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Database error", 500));
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    let users = await User.find({});
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return next(
      new HttpError(
        "Something went wrong while fetching users. Please try again.",
        500
      )
    );
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  const id = req.params.id;

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return next(
      new HttpError(
        "Something went wrong while fetching user details. Please try again.",
        500
      )
    );
  }
};

// Update user
const updateUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Invalid inputs passed, please try again",
      errors: errors.array(),
    });
  }

  const id = req.params.id;
  const {
    name,
    fatherName,
    occupation,
    phoneNumber,
    age,
    familyMembers,
    presentAddress,
    permanentAddress,
    aadharCard,
    aadharCardPhoto,
    slotBooking,
  } = req.body;

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.fatherName = fatherName;
    user.occupation = occupation;
    user.phoneNumber = phoneNumber;
    user.age = age;
    user.familyMembers = familyMembers;
    user.presentAddress = presentAddress;
    user.permanentAddress = permanentAddress;
    user.aadharCard = aadharCard;
    user.aadharCardPhoto = aadharCardPhoto;
    user.slotBooking = slotBooking;

    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Database error", 500));
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Database error", 500));
  }
};

exports.createUser = createUser;
exports.createMonthlyPayment = createMonthlyPayment;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
