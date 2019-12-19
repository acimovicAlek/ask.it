const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const questionController = require("../controllers/question");
const authenticate = require("../middlewares/authenticate");

router.post("/", authorization, questionController.createQuestion);
router.get("/myquestions", authorization, questionController.getMyQuestionsPage);
router.get("/hot", authenticate, questionController.getHot);
router.get("/:id", authenticate, questionController.getQuestionById);
router.put("/:id", authorization, questionController.vote);
router.get("/", authenticate, questionController.getPage);

module.exports = router;
