const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user");
const env = require("../../env");

const register = (req, res, next) => {
  userRepository
    .registerUser(req.body)
    .then(user => {
      res.status(201).json({
        message: "User created.",
        user:{
            id: user.id,
            username: user.username
        }
      });
    })
    .catch(error => res.status(error.status || 500).json({error}));
};

const login = (req, res, next) => {
  userRepository
    .checkCredentials(req.body)
    .then(user => {
      if (!user)
        res.status(401).body({
          message: "Auth failed."
        });
      const token = jwt.sign(
        {
          username: user.username,
          id: user._id
        },
        env.JWT_KEY,
        {
          expiresIn: "1h"
        }
      );
      res.status(200).json({
        message: "Auth successful",
        token: token
      });
    })
    .catch(error => res.status(error.status || 500).json({error}));
};

const topUsers = (req, res, next) => {
  userRepository
    .getTopUsers()
    .then(topUsers => res.json({ topUsers }))
    .catch(err => {
      res.status(err.status || 500).json({
        error: err
      });
    });
};

const getUser = (req, res, next) => {
  userRepository
    .getById(req.params.id)
    .then(user => {
      if (!user)
        res.status(404).json({
          message: "User not found."
        });
      res.json({ user });
    })
    .catch(error => res.status(error.status || 500).json({error}));
};

const updateUser = (req, res, next) => {
  userRepository
    .updateUser(req.userData.id, req.body)
    .then(user => {
      if (!user)
        res.status(409).json({
          message: "User is not updated."
        });

      res.json({
        message: "User updated."
      });
    })
    .catch(error => {console.log(error);res.status(error.status || 500).json(error);});
};

module.exports = {
  register,
  login,
  topUsers,
  getUser,
  updateUser
};
