const express = require("express");
const {
  registerUser,
  registerEmployer,
  logout,
  login,
  refreshAcessToken,
} = require("../controllers/auth.controller");
const {
  validateUser,
  validateEmployer,
  validateLogin,
} = require("../middleware/Validations");

const authRouter = express.Router();

authRouter.post("/register/user", validateUser, registerUser);
authRouter.post("/register/employer", validateEmployer, registerEmployer);

authRouter.post("/login", validateLogin, login);

authRouter.get("/refresh", refreshAcessToken);

authRouter.get("/logout", logout);

module.exports = authRouter;
