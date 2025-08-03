const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hash = require('bcrypt');

const UserSchema = new Schema ({

    username: { 
        type: String , 
        minLength: 2 ,
        required: true ,
        unique : true
    },
    email: { 
        type: String, 
        required: true 
        ,unique: true 
    },
    password: {
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ["student", 'doctor' , 'admin'],
        default: "student" 
    },
    otp: {
        type: String
    },
    OTPExpiry: {
        type: Date
    },
    IsVerified: {
        type: Boolean,
        default: false
    }
} , {
    timestamps : true,
    discriminatorKey : 'role'
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) { 
        this.password = await hash.hash(this.password, 10);
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;