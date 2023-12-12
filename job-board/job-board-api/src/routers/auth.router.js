const express = require('express');
const { loginUser, loginEmployer, registerUser, registerEmployer, logout } = require('../controllers/auth.controller');
const { validateUser, validateEmployer, validateLogin } = require('../middleware/Validations');

const authRouter = express.Router();

authRouter.post('/register/user', validateUser, registerUser);
authRouter.post('/register/employer', validateEmployer, registerEmployer);

authRouter.post('/login/user', validateLogin, loginUser);
authRouter.post('/login/employer', validateLogin, loginEmployer);

authRouter.get('/logout', logout);

module.exports = authRouter;