const jwt = require('jsonwebtoken');
require('dotenv').config();
const Secret = process.env.SecretToken;
const Mail = require('nodemailer')
//const RefSecret = process.env.RefreshToken;

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

