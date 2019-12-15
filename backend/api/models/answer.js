const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
  numberOfUpVotes: {
    type: Number,
    default: 0,
    index: true
  },
  numberOfDownVotes: {
    type: Number,
    default: 0,
    index: true
  },
  upVotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  downVotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  ]
});

questionSchema.methods.voted = function voted(userId) {
  if (this.upVotes.includes(userId)) return 1;
  else if (this.downVotes.includes(userId)) return -1;
  return 0;
};

questionSchema.methods.toggleDownVote = function downVote(userId) {
  if (this.upVotes.includes(userId)) {
    this.upVotes.splice(this.upVotes.indexOf(userId), 1);
    this.numberOfUpVotes--;
  } else if (this.downVotes.includes(userId)) {
    this.downVotes.splice(this.downVotes.indexOf(userId), 1);
    this.numberOfDownVotes--;
  }
  this.downVotes.push(userId);
  this.numberOfDownVotes++;
};

questionSchema.methods.toggleUpVote = function upVote(userId) {
  if (this.upVotes.includes(userId)) {
    this.upVotes.splice(this.upVotes.indexOf(userId), 1);
    this.numberOfUpVotes--;
  } else if (this.downVotes.includes(userId)) {
    this.downVotes.splice(this.downVotes.indexOf(userId), 1);
    this.numberOfDownVotes--;
  }
  this.upVotes.push(userId);
  this.numberOfUpVotes++;
};

module.exports = mongoose.model("answer", answerSchema);