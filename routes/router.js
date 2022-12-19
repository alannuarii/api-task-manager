const express = require("express");
const router = express.Router();
const sample = require("../controller/sample");
const auth = require("../controller/auth");
const verification = require("../middleware/verifyToken");

router.get("/", verification, sample.main);
router.get("/user", auth.getUser);
router.post("/login", auth.login);

module.exports = router;
