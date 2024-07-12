const express = require("express");
const { check } = require("express-validator");
const suggestionController = require("../Controllers/SuggestionController");

const router = express.Router();

router.post(
  "/create/suggestion",
  [check("name").not().isEmpty(), check("comments").not().isEmpty()],
  suggestionController.createSuggestion
);

router.get("/get/all/suggestions", suggestionController.getAllSuggestions);

router.delete("/delete/suggestion/:id", suggestionController.deleteSuggestion);

module.exports = router;
