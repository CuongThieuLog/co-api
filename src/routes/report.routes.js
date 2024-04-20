let router = require("express").Router();
const ReportController = require("../controllers/report.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, ReportController.findAll);
router.post("/", auth, ReportController.create);
router.get("/:id", auth, ReportController.find);
router.put("/:id", auth, ReportController.update);
router.delete("/:id", auth, ReportController.remove);

module.exports = router;
