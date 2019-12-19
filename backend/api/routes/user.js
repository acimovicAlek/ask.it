const express = require("express");
const router = express.Router();
const authorization = require("../middlewares/authorization");

const userController = require("../controllers/user");

router.post("/", userController.register);
router.post("/login", userController.login);
router.get("/top", userController.topUsers);
router.get("/:id", userController.getUser);
router.patch("/", authorization, userController.updateUser);

module.exports = router;
