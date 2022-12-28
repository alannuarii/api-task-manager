const db = require("../db/connection");
const getRandomCharacters = require("../utils/randomChar");
const timestamp = require("../utils/timestamp");

const inputTask = (req, res) => {
  const { task_name, executor, time_finish, notes, user_id } = req.body;
  const attachment = req.files.attachment;
  attachment.name = `${getRandomCharacters(4)}${Date.now()}.jpg`;
  attachment.mv("./uploads/img/" + attachment.name);
  const pathAttachment = "uploads/img/" + attachment.name;
  const sql = `INSERT INTO task (task_name, executor, time_finish, time_assign, notes, user_id, attachment) VALUES ('${task_name}', '${executor}', '${time_finish}', '${timestamp}', '${notes}', ${user_id}, '${pathAttachment}')`;
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

module.exports = { inputTask };
