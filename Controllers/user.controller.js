const jwt = require('jsonwebtoken');
const Mail = require('nodemailer')
const hash = require('bcrypt');
const { promisify } = require('util');
const User = require('../models/Userschema');
const doctor = require('../models/Doctorschema');
const student = require('../models/Studentschema');
const admin = require('../models/Adminschema');
require('dotenv').config();
const Secret = process.env.SecretToken;


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.IsVerified) {
            return res.status(403).json({ message: 'User is not verified' });
        }
        const isPasswordValid = await hash.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role}, Secret, { expiresIn: '2h' });
        res.status(200).json({ message: 'Login successful', token ,  user: { id: user._id, username: user.username, role: user.role }});
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
}


const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error during logout' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
}


const SignUp = async(req, res,next) => {
    const { email, password, username, role } = req.body;
    let checkUser = await User.findOne({ email });
    if (checkUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = req.body;

    try{
        if (newUser.role === "doctor") {
            const Adduser = await doctor.create(newUser);
            res.status(201).json({ message: 'Doctor created successfully', AddedUser: Adduser, data: await doctor.find({}) });
        }
        else if (newUser.role == "student") {
            const Adduser = await student.create(newUser);
            res.status(201).json({ message: 'Student created successfully', AddedUser: Adduser, data: await student.find({}) });
        }
        else if (newUser.role == "admin") {
            const Adduser = await admin.create(newUser);
            res.status(201).json({ message: 'Admin created successfully', AddedUser: Adduser, data: await admin.find({}) });
        }
        else {
            const Adduser = await User.create(newUser);
            res.status(201).json({ message: 'User created successfully', AddedUser: Adduser, data: await User.find({}) });
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create user', error: error.message });
    }
}

const GetStudents = async (req, res) => {
    try {
        const students = await student.find();
        res.status(200).json({ message: 'success', data: students });
    } catch (error) {
        res.status(400).json({ message: 'failed to get students', error });
    }
}

const GetDoctors = async (req, res) => {
    try {
        const doctors = await doctor.find();
        res.status(200).json({ message: 'success', data: doctors });
    }
    catch (error) {
        res.status(400).json({ message: 'failed to get doctors', error });
    }
}

module.exports= {login,SignUp,logout,GetStudents,GetDoctors};