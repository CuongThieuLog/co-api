const Attendance = require("../models/attendance.model");

function AttendanceController() {
  this.checkIn = async (req, res) => {
    const { userId } = req.body;

    try {
      const existingAttendance = await Attendance.findOne({
        user: userId,
        checkout: null,
      });
      if (existingAttendance) {
        return res
          .status(400)
          .json({ error: "You have already checked in before" });
      }

      const checkinRecord = new Attendance({
        user: userId,
        checkin: new Date(),
      });

      await checkinRecord.save();

      res.status(200).json({ message: "Check-in successfully" });
    } catch (error) {
      console.error("Error while checking in:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  };

  this.checkOut = async (req, res) => {
    const { userId } = req.body;

    try {
      const existingAttendance = await Attendance.findOne({
        user: userId,
        checkout: null,
      });
      if (!existingAttendance) {
        return res.status(400).json({ error: "You haven't checked in" });
      }

      existingAttendance.checkout = new Date();
      await existingAttendance.save();

      res.status(200).json({ message: "Checkout successfully" });
    } catch (error) {
      console.error("Error while checking out:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  };

  this.getAttendanceForDate = async (req, res) => {
    const { userId, date } = req.body;

    try {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      const attendanceRecords = await Attendance.find({
        user: userId,
        checkin: { $gte: startDate, $lte: endDate },
      });

      if (attendanceRecords.length === 0) {
        return res.status(404).json({
          message: "No attendance records found for the specified date",
        });
      }

      const attendanceInfo = attendanceRecords.map((record) => ({
        checkin: record.checkin.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        checkout: record.checkout
          ? record.checkout.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : null,
      }));

      res.status(200).json({ attendance: attendanceInfo });
    } catch (error) {
      console.error("Error while getting attendance for date:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  };

  return this;
}

module.exports = new AttendanceController();
