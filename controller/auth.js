const db = require("../db/connection");
const authUtils = require("../utils/authUtils");
const jwt = require("jsonwebtoken");
const env = require("../utils/env");

const getUser = (req, res) => {
  const sql = `SELECT * FROM user`;
  db.query(sql, (error, result) => {
    if (error) {
      res.status(400).json({
        message: error.message,
      });
    }
    res.status(200).json({
      message: "Get data user successfully",
      data: result,
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT email, password FROM user WHERE email = '${email}'`;
  db.query(sql, async (error, result) => {
    if (result.length < 1) {
      res.status(401).json({
        message: "Email not found",
      });
      return;
    }
    const checkPassword = await authUtils.checkPassword(password, result[0].password);
    if (checkPassword) {
      const token = jwt.sign({ email: result[0].email }, env.secretKey, { expiresIn: "1h" });
      res.header("auth-token", token);
      res.status(200).json({
        message: "Login successfully",
      });
    } else {
      res.status(401).json({
        message: "Password don't match",
      });
    }
  });
};

module.exports = { getUser, login };
