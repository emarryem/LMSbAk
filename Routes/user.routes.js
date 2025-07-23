const express = require('express');
const router = express.Router();
const app = express();


const {authenticate, authorize,SendOTP,verifyOTP} = require('../Middlewares/auth.middleware');
const {login,SignUp} = require('../Controllers/user.controller');

router.post('/login', login);
router.post('/signup',SendOTP,SignUp);

module.exports = router;

