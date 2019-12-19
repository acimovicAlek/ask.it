const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const answerController = require("../controllers/answer");
const authentication = require("../middlewares/authenticate");

router.post('/', authorization, answerController.createAnswer);
router.get('/:questionId', authentication, answerController.getAnswerPage);
router.put('/:id', authorization, answerController.vote);

module.exports = router;
