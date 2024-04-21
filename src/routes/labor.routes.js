let router = require("express").Router();
const LaborController = require("../controllers/labor.controller");
const auth = require("../middleware/auth.middleware");

router.get("/all/key-value", auth, LaborController.findAllKeyValue);

module.exports = router;
