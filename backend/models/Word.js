const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  definitions: [{ type: String }],
  lexicalCategory: { type: String },
  phoneticSpelling: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Word", wordSchema);
