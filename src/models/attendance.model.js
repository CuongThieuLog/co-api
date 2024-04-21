const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkin: {
      type: Date,
      required: true,
    },
    checkout: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;
