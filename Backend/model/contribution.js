const mongoose = require("mongoose");   
 const contributionSchema = new mongoose.Schema({//create schema
  label: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
  },
  date: { type: String, require: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
});

const Contribution = mongoose.model("Contribution", contributionSchema);
module.exports = Contribution;