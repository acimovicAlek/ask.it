const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/user");

//Internal error hangler
const handleError = error => {
  error.status = 500;
  reject(error);
};

const registerUser = user => {
  return new Promise((resolve, reject) => {
    User.find({ username: user.username })
      .exec()
      .then(result => {
        if (result.length >= 1) {
          const error = new Error();
          error.status = 409;
          error.message = "User exists.";
          reject(error);
        }
        bcrypt.hash(user.password, 10, (err, hash) => {
          if (err) reject(err);

          const newUser = new User({
            _id: mongoose.Types.ObjectId(),
            username: user.username,
            password: hash
          });

          newUser
            .save()
            .then(result => {
              resolve(result);
            })
            .catch(err => reject(err));
        });
      })
      .catch(err => reject(err));
  });
};

const checkCredentials = credentials => {
  return new Promise((resolve, reject) => {
    User.find({ username: credentials.username })
      .exec()
      .then(users => {
        if (users.length < 1) resolve(null);
        bcrypt.compare(
          credentials.password,
          users[0].password,
          (err, result) => {
            if (err || !result) resolve(null);
            resolve(users[0]);
          }
        );
      })
      .catch(err => reject(err));
  });
};

const getTopUsers = () => {
  return new Promise((resolve, reject) => { 
    User.find()
      .sort("numberOfAnswers")
      .limit(10)
      .select("username")
      .exec()
      .then(result => resolve(result))
      .catch(err => reject(error));
  });
};

const getById = id => {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .select("username _id numberOfAnswers")
      .exec()
      .then(user => resolve(user))
      .catch(err => reject(err));
  });
};

const updateUser = (id, body) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: id }, { $set: body })
      .exec()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
};

const incrementAnswer = id => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: id }, { $inc: { numberOfAnswers: 1 } })
      .exec()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
};

module.exports = {
  registerUser,
  checkCredentials,
  getTopUsers,
  getById,
  updateUser,
  incrementAnswer
};
