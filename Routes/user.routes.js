const express = require('express');
const router = express.Router();
const app = express();

const {authenticate, authorize} = require('../Middlewares/auth.middleware');
const {login,SignUp} = require('../Controllers/user.controller');

router.post('/login',login)
router.post('./signup',SignUp)
