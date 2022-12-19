const jwt = require("jsonwebtoken");
const env = require("../utils/env");

const verification = (req, res, next) => {
  const token = req.header("auth-token");
  try {
    decoded = jwt.verify(token, env.secretKey);
    if (decoded.division != "Operasi")
      return res.status(401).json({
        message: "No access for you",
      });
    next();
  } catch (error) {
    res.status(401).json({
      message: "No access for you",
    });
  }
};

module.exports = verification;
