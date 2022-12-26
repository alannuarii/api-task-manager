const db = require("../db/connection");
const authUtils = require("../utils/authUtils");
const jwt = require("jsonwebtoken");
const env = require("../utils/env");

const register = async (req, res) => {
  const { name, email, password, division } = req.body;
  const hashPassword = await authUtils.setPassword(password);
  const sql = `INSERT INTO user (name, email, password, division) VALUES ('${name}', '${email}', '${hashPassword}', '${division}')`;
  db.query(sql, (error, result) => {
    if (error) {
      res.status(400).json({ message: error.sqlMessage });
    }
    const data = {
      isSuccess: result.affectedRows,
      id: result.insertId,
    };
    res.status(200).json({ message: data });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM user WHERE email = '${email}'`;
  db.query(sql, async (error, result) => {
    if (result.length < 1) {
      res.status(401).json({
        message: "Email not found",
      });
      return;
    }
    const checkPassword = await authUtils.checkPassword(password, result[0].password);
    if (checkPassword) {
      const token = jwt.sign(
        {
          id_user: result[0].id_user,
          name: result[0].name,
          email: result[0].email,
          division: result[0].division,
        },
        env.secretKey,
        { expiresIn: "1h" }
      );
      res.header("x-access-token", token);
      console.log(res.header("x-access-token"));
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

module.exports = { login, register };
