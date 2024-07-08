// UserController.js

const { validationResult } = require("express-validator");
const User = require("../Models/User");
const HttpError = require("../Middleware/http-error");

const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    name,
    fatherName,
    occupation,
    phoneNumber,
    age,
    slotBooking,
    presentAddress,
    permanentAddress,
    aadharCard,
    familyMembers,
    paymentAmount,
  } = req.body;

  let aadharCardPhoto, paymentScreenshot;

  if (req.files) {
    aadharCardPhoto = req.files.aadharCardPhoto
      ? req.files.aadharCardPhoto[0].path
      : undefined;
    paymentScreenshot = req.files.paymentScreenshot
      ? req.files.paymentScreenshot[0].path
      : undefined;
  }

  let parsedFamilyMembers = [];
  if (familyMembers) {
    try {
      parsedFamilyMembers = JSON.parse(familyMembers);
    } catch (err) {
      return next(new HttpError("Invalid family members data.", 422));
    }
  }

  let newRenewalDate = new Date();
  newRenewalDate.setMonth(newRenewalDate.getMonth() + 1);
  user.renewalDate = newRenewalDate;

  const createdUser = new User({
    name,
    fatherName,
    occupation,
    phoneNumber,
    age,
    slotBooking,
    presentAddress,
    permanentAddress,
    aadharCard,
    aadharCardPhoto,
    familyMembers: parsedFamilyMembers,
    payments: [{ amount: paymentAmount, screenshot: paymentScreenshot }],
    renewalDate,
    seatNumber: Math.floor(Math.random() * 100) + 1, // Assign a random seat number
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating user failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser });
};

const createMonthlyPayment = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { phoneNumber, paymentAmount } = req.body;

  let paymentScreenshot;
  if (req.files) {
    paymentScreenshot = req.files.paymentScreenshot
      ? req.files.paymentScreenshot[0].path
      : undefined;
  }

  try {
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    user.payments.push({
      amount: paymentAmount,
      screenshot: paymentScreenshot,
    });

    // Update renewal date
    let newRenewalDate = new Date();
    newRenewalDate.setMonth(newRenewalDate.getMonth() + 1);
    user.renewalDate = newRenewalDate;

    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return next(
      new HttpError("Creating monthly payment failed, please try again.", 500)
    );
  }
};

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
    renewalDate,
    seatNumber,
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
    user.familyMembers = JSON.parse(familyMembers);
    user.presentAddress = presentAddress;
    user.permanentAddress = permanentAddress;
    user.aadharCard = aadharCard;
    user.aadharCardPhoto = aadharCardPhoto;
    user.slotBooking = slotBooking;
    user.renewalDate = renewalDate;
    user.seatNumber = seatNumber;

    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Database error", 500));
  }
};
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

module.exports = {
  createUser,
  createMonthlyPayment,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
