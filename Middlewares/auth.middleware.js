const jwt = require('jsonwebtoken');
require('dotenv').config();
const Secret = process.env.SecretToken;
const Mail = require('nodemailer')
//const RefSecret = process.env.RefreshToken;
const userModel = require('../models/Userschema');
require('dotenv').config();
const {promisify} = require('util');




exports.authenticate = async (req, res, next) => {

    let {authorization} = req.headers;
    //let authenticate = req.body.token;
    if (!authorization) {
        console.log(authorization);
        return res.status(400).json({ message: 'You Must Login First' });
    }
try{
    let decoded = await promisify(jwt.verify)(authorization, Secret);
    req.role = decoded.role;
    next();
}
catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Invalid Token' });

};
}

exports.authorize = (...roles) => {
    return function (req, res, next) {
        if(!roles.includes(req.role)) {
            console.log(req.role);
            return res.status(403).json({ message: 'You are not authorized' });
        }
        else{
             next();
        }
    }
}


exports.SendOTP = async (req, res, next) => {
    try {
        const email = req.body.email; // Get email from request body
        const user = await userModel.findOne({email});
        if (user && user.IsVerified) {
            return res.status(400).json({ message: 'User already verified' });
        }

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const genOtp = Math.floor(100000 + Math.random() * 900000);
        console.log(`Generated OTP: ${genOtp}`);
        
        const transporter = Mail.createTransport({
            host: 'smtp.mail.yahoo.com',
            port: 465, // Yahoo requires SSL
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${genOtp}. Please use this code to verify your account.`
        };

        
        await transporter.sendMail(mailOptions);
        user.otp = genOtp.toString();
        user.OTPExpiry = new Date(Date.now() + 3600000); 
        await user.save(); 
       next();
        
    } catch (error) {
        console.error("OTP sending failed:", error);
        res.status(500).json({ error: "Failed to send OTP" , error: error.message });
    }
};

exports.verifyOTP = async (req, res,next) => {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    if (!otp) {
        return res.status(400).json({ error: "OTP is required" });
    }

    if (otp !== user.otp || new Date() > user.OTPExpiry) {
        return res.status(400).json({ error: "Invalid OTP or expired" });
    }

    try {
        res.status(200).json({ message: "OTP verified successfully" });
        user.IsVerified = true;
        user.otp = null;
        user.OTPExpiry = null;
        await user.save();
        next();

    } catch (error) {
        console.log("Error verifying OTP:", error);
        res.status(500).json({ error: "Failed to verify OTP" });
    }
}