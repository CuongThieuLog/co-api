let router = require("express").Router();
let UserController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.post("/user/register", UserController.register);
router.get("/user/me", auth, UserController.find);
router.get("/user", auth, UserController.findAll);
router.post("/user/create", auth, UserController.createUserIsLabor);
router.put("/user/update/:id", auth, UserController.updateUserIsLabor);
router.get("/user/:id", auth, UserController.getUserIsLaborById);
router.put("/users/:id/password", auth, UserController.updatePassword);

module.exports = router;
