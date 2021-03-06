const jwt = require("jsonwebtoken");
const env = require("../../env");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    req.userData = {
        username: null,
        id: null
    };
    next();
  }
};
