const { validationResult } = require("express-validator");
const Suggestion = require("../Models/Suggestion");
const HttpError = require("../Middleware/http-error");

const createSuggestion = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, comments } = req.body;

  const createdSuggestion = new Suggestion({
    name,
    comments,
  });

  try {
    await createdSuggestion.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating suggestion failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ suggestion: createdSuggestion });
};

const getAllSuggestions = async (req, res, next) => {
  try {
    const suggestions = await Suggestion.find({});
    res.status(200).json({ suggestions });
  } catch (err) {
    console.error(err);
    return next(
      new HttpError("Fetching suggestions failed, please try again.", 500)
    );
  }
};

const deleteSuggestion = async (req, res, next) => {
  const suggestionId = req.params.id;

  let suggestion;
  try {
    suggestion = await Suggestion.findById(suggestionId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete suggestion.", 500)
    );
  }

  if (!suggestion) {
    return next(new HttpError("Could not find suggestion for this id.", 404));
  }

  try {
    await suggestion.deleteOne();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete suggestion.", 500)
    );
  }

  res.status(200).json({ message: "Suggestion deleted successfully." });
};

module.exports = {
  createSuggestion,
  getAllSuggestions,
  deleteSuggestion,
};
