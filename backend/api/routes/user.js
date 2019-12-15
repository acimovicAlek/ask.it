const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const userController = require("../controllers/user");

router.post("/", userController.register);
router.post("/login", userController.login);
router.get("/top", userController.topUsers);
router.get("/:id", userController.getUser);
router.patch("/:id", auth, userController.updateUser);

module.exports = router;
