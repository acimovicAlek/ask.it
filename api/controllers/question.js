const questionRepository = require("../repositories/question");
const userRepository = require("../repositories/user");

const createQuestion = (req, res, next) => {
  questionRepository
    .createQuestion(req.userData.id, req.body)
    .then(question => {
      console.log(req.userData);
      userRepository
        .then(res.status(201).json(question))
        .catch(error => res.status(error.status || 500).json({ error }));
    })
    .catch(error => res.status(error.status || 500).json({ error }));
};

const getQuestionById = (req, res, next) => {
  questionRepository
    .getQuestion(req.params.id, req.userData.id)
    .then(question => res.json(question))
    .catch(error => res.status(error.status || 500).json({ error }));
};

const getPage = (req, res, next) => {
  const pageNumber = req.query.page || 1;
  questionRepository  
    .getPage(pageNumber, req.userData.id)
    .then(page => res.json({
        pageNumber,
        questions: page 
    }))
    .catch(error => res.status(error.status || 500).json({ error }));
};

const getMyQuestionsPage = (req, res, next) => {
  const pageNumber = req.query.page || 1;
  questionRepository  
    .getMyQuestionsPage(pageNumber, req.userData.id)
    .then(page => res.json({
        pageNumber: pageNumber,
        questions: page 
    }))
    .catch(error => res.status(error.status || 500).json({ error }));
};

const vote = (req, res, next) => {
  questionRepository
    .vote(req.params.id, req.body.vote, req.userData.id)
    .then(result => {
        result?res.json({}):res.status(409).json({});
    })
    .catch(error => res.status(error.status || 500).json({ error }));
};

const getHot = (req, res, next) => {
    console.log(req.query.page);
    const page = req.query.page || 1;
    questionRepository
      .getHot(page, req.userData.id)
      .then(page => res.json(page))
      .catch(error => {console.log(error);res.status(error.status || 500).json({ error });});
  };

module.exports = {
  createQuestion,
  getQuestionById,
  getPage,
  vote,
  getHot,
  getMyQuestionsPage
};
