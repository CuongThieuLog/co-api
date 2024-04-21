let router = require("express").Router();
const CostController = require("../controllers/cost.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, CostController.findAll);
router.post("/", auth, CostController.create);
router.get("/:id", auth, CostController.find);
router.put("/:id", auth, CostController.update);
router.delete("/:id", auth, CostController.remove);

module.exports = router;
