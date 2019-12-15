const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const answerController = require("../controllers/answer");
const identity = require("../middlewares/indentity");

router.post('/', auth, answerController.createAnswer);
router.get('/:questionId', identity, answerController.getAnswerPage);
router.put('/:id', auth, answerController.vote);

module.exports = router;
