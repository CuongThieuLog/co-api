const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema(
  {
    material_name: {
      type: String,
      required: true,
      index: true,
    },
    unit_price: {
      type: Number,
      required: true,
    },
    quantity_available: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", MaterialSchema);

module.exports = Material;
