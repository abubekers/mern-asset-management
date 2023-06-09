const express = require("express");
const { Router } = require("express");
const { emailValidator } = require("../middleware/emailValidator.js");
const {loginController,signupController,logout} = require("../controllers/userController.js");
const { emailPassRequiredValidator } = require("../middleware/emailPasswordRequiredValidator.js");
const { passwordValidator } = require("../middleware/passwordValidator.js");

const userRouter = Router();

userRouter.post("/signup",[emailPassRequiredValidator, emailValidator, passwordValidator], signupController);
userRouter.post("/login", [emailPassRequiredValidator, emailValidator, passwordValidator], loginController);
userRouter.post("/logout", logout);

module.exports = { userRouter };
