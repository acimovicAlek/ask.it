const mongoose = require("mongoose");

const Question = require("../models/question");
const User = require("../models/user");

const createQuestion = (userId, question) => {
  return new Promise((resolve, reject) => {
    const newQuestion = new Question({
      _id: mongoose.Types.ObjectId(),
      user: userId,
      question: question.question,
      title: question.title
    });
    newQuestion
      .save()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
};

const getQuestion = (id, userId) => {
  return new Promise((resolve, reject) => {
    Question.findById(id)
      .populate("user", "-password")
      .exec()
      .then(question => {
        if (userId)
          question = {
            vote: question.voted(userId),
            ...question._doc,
            upVotes: undefined,
            downVotes: undefined
          };
        else
          question = {
            ...question._doc,
            vote: 0,
            upVotes: undefined,
            downVotes: undefined
          };
        resolve(question);
      })
      .catch(err => reject(err));
  });
};

const getPage = (page, userId) => {
  return new Promise((resolve, reject) => {
    Question.find()
      .sort({ created: "desc" })
      .skip((page - 1) * 20)
      .limit(20)
      .populate("user", "-password")
      .exec()
      .then(results => {
        results = results.map(question => {
          return {
            ...question._doc,
            vote: userId ? question.voted(userId) : 0,
            upVotes: undefined,
            downVotes: undefined
          };
        });
        resolve(results);
      })
      .catch(err => reject(err));
  });
};

const getMyQuestionsPage = (page, userId) => {
  return new Promise((resolve, reject) => {
    Question.find({user:userId})
      .sort({ created: "desc" })
      .skip((page - 1) * 20)
      .limit(20)
      .populate("user", "-password")
      .exec()
      .then(results => {
        results = results.map(question => {
          return {
            ...question._doc,
            vote: userId ? question.voted(userId) : 0,
            upVotes: undefined,
            downVotes: undefined
          };
        });
        resolve(results);
      })
      .catch(err => reject(err));
  });
};

const vote = (id, vote, userId) => {
  return new Promise((resolve, reject) => {
    Question.findById(id)
      .exec()
      .then(question => {
        if (!question) resolve(false);
        if(vote > 0) question.toggleUpVote(userId)
        else if(vote < 0) question.toggleDownVote(userId);
        question
          .save()
          .then(result => resolve(true))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
};

const getHot = (page, userId) => {
  return new Promise((resolve, reject) => {
    Question.find()
      .sort({ numberOfUpVotes: "asc", numberOfDownVotes:"desc" })
      .select("_id title question user numberOfUpVotes numberOfDownVotes")
      .populate("user", "-passowrd")
      .skip((page - 1) * 20)
      .limit(20)
      .exec()
      .then(results => resolve(results))
      .catch(err => reject(err));
  });
};

module.exports = {
  createQuestion,
  getQuestion,
  getPage,
  vote,
  getHot,
  getMyQuestionsPage
};
