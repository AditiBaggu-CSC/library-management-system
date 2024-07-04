// userRoutes.js
const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const userController = require("../Controllers/UserController");
const fileUpload = require("../Middleware/fileUpload");

// Create a new user
router.post(
  "/create/user",
  fileUpload.fields([
    { name: "aadharCardPhoto", maxCount: 1 },
    { name: "paymentScreenshot", maxCount: 1 },
  ]),
  [
    check("name").not().isEmpty(),
    check("fatherName").not().isEmpty(),
    check("occupation").not().isEmpty(),
    check("phoneNumber").not().isEmpty(),
    check("age").isNumeric(),
    check("presentAddress").not().isEmpty(),
    check("permanentAddress").not().isEmpty(),
    check("aadharCard").not().isEmpty(),
    check("slotBooking").not().isEmpty(),
    check("paymentAmount").isNumeric(),
  ],
  userController.createUser
);

// Create a monthly payment
router.post(
  "/monthly/payment",
  fileUpload.fields([{ name: "paymentScreenshot", maxCount: 1 }]),
  [check("phoneNumber").not().isEmpty(), check("paymentAmount").isNumeric()],
  userController.createMonthlyPayment
);

// Get all users
router.get("/get/all/users", userController.getAllUsers);

// Get user by ID
router.get("/get/user/by/:id", userController.getUserById);

// Update user
router.patch(
  "/update/user/:id",
  [
    check("name").optional().not().isEmpty(),
    check("fatherName").optional().not().isEmpty(),
    check("occupation").optional().not().isEmpty(),
    check("phoneNumber").optional().not().isEmpty(),
    check("age").optional().isNumeric(),
    check("presentAddress").optional().not().isEmpty(),
    check("permanentAddress").optional().not().isEmpty(),
    check("aadharCard").optional().not().isEmpty(),
    check("aadharCardPhoto").optional().not().isEmpty(),
    check("slotBooking").optional().not().isEmpty(),
    check("renewalDate").optional().isISO8601(),
  ],
  userController.updateUser
);

// Delete user
router.delete("/delete/user/:id", userController.deleteUser);

module.exports = router;
