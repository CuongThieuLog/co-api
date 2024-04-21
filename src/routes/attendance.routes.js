let router = require("express").Router();
const AttendanceController = require("../controllers/attendance.controller");
const auth = require("../middleware/auth.middleware");

router.post("/check-in", auth, AttendanceController.checkIn);
router.post("/check-out", auth, AttendanceController.checkOut);
router.get("/get-time-date", auth, AttendanceController.getAttendanceForDate);

module.exports = router;
