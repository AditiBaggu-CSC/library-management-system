const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comments: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion;
