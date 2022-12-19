const jwt = require("jsonwebtoken");
const env = require("../utils/env");

const verification = (req, res, next) => {
  const token = req.header("auth-token");
  try {
    jwt.verify(token, env.secretKey);
    next();
  } catch (error) {
    res.status(401).json({
      message: "No access for you",
    });
  }
};

module.exports = verification;
