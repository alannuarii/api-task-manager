// const express = require("express");
// const app = express();
// const port = 3000;
// const bodyParser = require("body-parser");
// const db = require("./connection");
// const Response = require("./reserved/response");
// const Auth = require("./reserved/user");

import express from "express";
import bodyParser from "body-parser";
import db from "./connection";

const app = express();
const port = 3000;

// Parsing Body
app.use(bodyParser.json());

// Instansiasi
const response = new Response();
const user = new Auth();

// Get All User
app.get("/user", (req, res) => {
  const sql = `SELECT * FROM user`;
  db.query(sql, (error, result) => {
    if (error) {
      response.error(400, error.sqlMessage, res);
    }
    response.success(200, result, "Data success", res);
  });
});

// Register
app.post("/register", async (req, res) => {
  const { name, email, password, divition } = req.body;
  const hashPassword = await user.setPassword(password);
  const sql = `INSERT INTO user (name, email, password, divition) VALUES ('${name}', '${email}', '${hashPassword}', '${divition}')`;
  db.query(sql, (error, result) => {
    if (error) {
      response.error(400, error.sqlMessage, res);
    }
    const data = {
      isSuccess: result.affectedRows,
      id: result.insertId,
    };
    response.success(200, data, "Insert data successfully", res);
  });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT email, password FROM user WHERE email = '${email}'`;
  db.query(sql, async (error, result) => {
    if (result.length < 1) {
      return response.error(401, "Email not found", res);
    }
    const checkPassword = await user.checkPassword(password, result[0].password);
    if (checkPassword) {
      response.success(200, checkPassword, "Login successfully", res);
    } else {
      response.error(401, "Password don't match", res);
    }
  });
});

// Running Port
app.listen(port, () => {
  // Command : npm run dev
  console.log(`Example app listening on port ${port}`);
});
