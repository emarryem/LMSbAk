const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hash = require('bcrypt');

const UserSchema = new Schema ({

    username: { 
        type: String , 
        minLength: 2 ,
        required: true 
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
        enum: ['student', 'doctor' , 'admin'],
        default: 'student', 
        required: true 
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