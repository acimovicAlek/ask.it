const mongoose = require("mongoose");

const Answer = require("../models/answer");
const User = require("../models/user");

const createAnswer = (userId, answer) => {
  return new Promise((resolve, reject) => {
    const newAnswer = new Answer({
      _id: mongoose.Types.ObjectId(),
      user: userId,
      question: answer.question,
      answer: answer.answer
    });
    newAnswer
      .save()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
};

const getAnswerPage = (page, questionId, userId) => {
  return new Promise((resolve, reject) => {
    Answer.find({ question: questionId })
      .sort({ created: "asc" })
      .skip((page - 1) * 20)
      .limit(20)
      .populate("user", "-password")
      .exec()
      .then(results => {
        results = results.map(answer => {
          return {
            ...answer._doc,
            vote: userId ? answer.voted(userId) : 0,
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
    Answer.findById(id)
      .exec()
      .then(answer => {
        if (!answer) resolve(false);
        if (vote > 0) answer.toggleUpVote(userId);
        else if (vote < 0) answer.toggleDownVote(userId);
        answer
          .save()
          .then(result => resolve(true))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
};

module.exports = {
  createAnswer,
  getAnswerPage,
  vote
};
