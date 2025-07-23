const jwt = require('jsonwebtoken');
const User = require('../models/Userschema');
require('dotenv').config();
const Secret = process.env.SecretToken;

const login = async (req, res) => {
    const { email, Password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await hash.compare(Password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role}, Secret, { expiresIn: '2h' });

        res.status(200).json({ message: 'Login successful', token ,  user: { id: user._id, username: user.username, role: user.role }});
    }
    catch (error) {
        res.status(500).json({ message: 'Error during login', error });
    }
}

const SignUp = async(req, res) => {
    const newUser = req.user;

    try{
        const Adduser = await User.create(newUser);
        res.status(201).json({ message: 'User created successfully', AddedUser: Adduser, data: await User.find({newUser}) });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create user', error });
    }
}

module.exports= {login,SignUp};