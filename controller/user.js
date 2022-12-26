const db = require("../db/connection");

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

module.exports = { getUser };
