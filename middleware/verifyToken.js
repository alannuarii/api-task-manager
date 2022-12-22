const jwt = require("jsonwebtoken");
const env = require("../utils/env");

const verification = (req, res, next) => {
  const token = req.header("x-access-token");
  try {
    decoded = jwt.verify(token, env.secretKey);
    if (decoded.division != "K3L dan Kam")
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
