const express = require('express')
// const cors = require("cors");
const { PrismaClient } = require('@prisma/client');
const router = express.Router()
// const { format } = require('date-fns');
// require('dotenv').config()


// Controller
const { register, login, getCurrentUser, update } = require("../controllers/UserController.js");

// Middlewares
const validate = require("../middlewares/handleValidation");
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidations");
const authGuard = require('../middlewares/authGuard.js');
const { imageUpload } = require('../middlewares/imageUpload.js');

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update)

module.exports = router;