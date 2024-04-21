const express = require("express");

const userRoute = require("./user.routes");
const authRoute = require("./auth.routes");
const projectRoute = require("./project.routes");
const materialRoute = require("./material.routes");
const reportRoute = require("./report.routes");
const attendanceRoute = require("./attendance.routes");
const laborRoute = require("./labor.routes");
const costRoute = require("./cost.routes");

const router = express.Router();

router.use("/", userRoute);
router.use("/", authRoute);
router.use("/project", projectRoute);
router.use("/material", materialRoute);
router.use("/report", reportRoute);
router.use("/", attendanceRoute);
router.use("/labor", laborRoute);
router.use("/cost", costRoute);

module.exports = router;
