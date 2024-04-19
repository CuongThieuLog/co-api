let router = require("express").Router();
const ProjectController = require("../controllers/project.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, ProjectController.findAll);
router.post("/", auth, ProjectController.create);
router.get("/:id", auth, ProjectController.find);
router.put("/:id", auth, ProjectController.update);
router.delete("/:id", auth, ProjectController.remove);

module.exports = router;
