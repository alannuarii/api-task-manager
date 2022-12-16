const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const Response = require("./response");

// Parsing Body 
app.use(bodyParser.json());

// Instansiasi Class Response
const response = new Response();

app.get("/", (req, res) => {
  response.success(200, "Ini data", "Data success", res);
});

// Running Port 
app.listen(port, () => {
  // Command : npm run dev
  console.log(`Example app listening on port ${port}`);
});
