const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");

// Create a new user
router.post("/users", userController.createUser);

// Get all users
router.get("/users", userController.getAllUsers);

// Get user by ID
router.get("/users/:id", userController.getUserById);

// Update user
router.put("/users/:id", userController.updateUser);

// Delete user
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
