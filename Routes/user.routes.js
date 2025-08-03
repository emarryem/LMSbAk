const express = require('express');
const router = express.Router();
const app = express();


const {authenticate, authorize,SendOTP,verifyOTP} = require('../Middlewares/auth.middleware');
const {login,SignUp,logout,GetDoctors,GetStudents} = require('../Controllers/user.controller');

router.post('/login', login);

router.post('/signup',SignUp,SendOTP);

router.post('/verify-otp', verifyOTP);

router.get('/getDoctors',authenticate, authorize('admin'), GetDoctors);

router.get('/getStudents',authenticate, authorize('admin'), GetStudents);

router.post('/logout', logout);

module.exports = router;

