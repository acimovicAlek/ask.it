const answerRepository = require("../repositories/answer");
const userRepository = require("../repositories/user");

const createAnswer = (req, res, next) => {
  answerRepository
    .createAnswer(req.userData.id, req.body)
    .then(answer => {
      userRepository
        .incrementAnswer(req.userData.id)
        .then(res.status(201).json(answer))
        .catch(error => res.status(error.status || 500).json({ error }));
    })
    .catch(error => res.status(error.status || 500).json({ error }));
};

const getAnswerPage = (req, res, next) => {
  const pageNumber = req.query.page || 1;
  console.log(pageNumber, req.params.questionId ,req.userData.id);
  answerRepository
    .getAnswerPage(pageNumber, req.params.questionId ,req.userData.id)
    .then(page => {
      res.json({
        questionId: req.params.questionId,
        pageNumber,
        answers: page
      })
    })
    .catch(error => res.status(error.status || 500).json({ error }));
};

const vote = (req, res, next) => {
  answerRepository
    .vote(req.params.id, req.body.vote, req.userData.id)
    .then(result => {
        result?res.json({}):res.status(409).json({});
    })
    .catch(error => res.status(error.status || 500).json({ error }));
};

module.exports = {
  createAnswer,
  getAnswerPage,
  vote
};
