const mongoose = require("mongoose");

const LaborSchema = new mongoose.Schema(
  {
    labor_name: {
      type: String,
      required: true,
      index: true,
    },
    position: {
      type: String,
    },
    rate_per_hour: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Labor = mongoose.model("Labor", LaborSchema);

module.exports = Labor;
