const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const questionController = require("../controllers/question");
const identity = require("../middlewares/indentity");

router.post("/", auth, questionController.createQuestion);
router.get("/hot", identity, questionController.getHot);
router.get("/:id", identity, questionController.getQuestionById);
router.get("/", identity, questionController.getPage);
router.put("/:id", auth, questionController.vote);

module.exports = router;
