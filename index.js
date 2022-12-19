const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const router = require("./routes/router");

// Parsing Body
app.use(bodyParser.json());

// Main Route
app.use("/", router);

// Running Port
app.listen(port, () => {
  // Command : npm run dev
  console.log(`Example app listening on port ${port}`);
});
