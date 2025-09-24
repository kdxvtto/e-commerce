const express = require('express');
const router = express.Router();
const { 
    register,
    login,
    logout,
    userProfile
} = require("../controllers/auth");

router.post("/register", register)
router.post("/login", login)
router.post("/logout/:id", logout)
router.get("/me", userProfile)

module.exports = router