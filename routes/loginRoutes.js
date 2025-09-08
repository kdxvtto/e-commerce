const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/verifyToken")
const login = require("../controllers/loginController")

router.post("/", verifyToken, login)

module.exports = router