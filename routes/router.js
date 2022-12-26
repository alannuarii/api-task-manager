const express = require("express");
const router = express.Router();
const sample = require("../controller/sample");
const auth = require("../controller/auth");
const input = require("../controller/inputTask");
const user = require("../controller/user");
const verification = require("../middleware/verifyToken");

router.get("/", verification, sample.main);

// User Route
router.get("/user", user.getUser);

// Auth Route
router.post("/login", auth.login);
router.post("/register", auth.register);

// Input Route
router.post("/input", input.inputTask);

module.exports = router;
