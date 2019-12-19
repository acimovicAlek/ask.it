const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const userRouter = require("./api/routes/user");
const questionRouter = require("./api/routes/question");
const answerRouter = require("./api/routes/answer");
const env = require("./env");

//Setting up db connection
mongoose.connect("mongodb+srv://askit:"+env.MDB_PWD+"@askit-fjhah.mongodb.net/test?retryWrites=true&w=majority");

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("combined"));

//Set cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.json({});
  }
  next();
});

//Routes
app.use("/users", userRouter);
app.use('/questions', questionRouter);
app.use('/answers', answerRouter);

//Handling unexistant route
app.use((req, res, next) => {
  const error = new Error("Not found.");
  error.status = 404;
  next(error);
});

//Handling errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
