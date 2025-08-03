const mongoose = require('mongoose');
const User = require('./Userschema');
const adminSchema = new mongoose.Schema({});
module.exports = User.discriminator('admin', adminSchema);