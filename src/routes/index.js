const express = require("express");

const userRoute = require("./user.routes");
const authRoute = require("./auth.routes");
const projectRoute = require("./project.routes");

const router = express.Router();

router.use("/", userRoute);
router.use("/", authRoute);
router.use("/project", projectRoute);

module.exports = router;
