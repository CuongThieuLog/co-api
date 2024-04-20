let router = require("express").Router();
const MaterialController = require("../controllers/material.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, MaterialController.findAll);
router.post("/", auth, MaterialController.create);
router.get("/:id", auth, MaterialController.find);
router.put("/:id", auth, MaterialController.update);
router.delete("/:id", auth, MaterialController.remove);

module.exports = router;
