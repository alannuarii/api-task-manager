const express = require("express");
const app = express();
const port = 3000;
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./routes/router");
const cors = require("cors");

// Enable Files Upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Add Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Static Files
app.use(express.static("uploads"));

// Main Route
app.use("/", router);

// Running Port
app.listen(port, () => {
  // Command : npm run dev
  console.log(`Example app listening on port http://localhost:${port}`);
});
