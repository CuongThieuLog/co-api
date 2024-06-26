const mongoose = require("mongoose");

const CostSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    labor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Labor",
      required: true,
    },
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    },
    cost_date: {
      type: Date,
      required: true,
    },
    cost_amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Cost = mongoose.model("Cost", CostSchema);

module.exports = Cost;
