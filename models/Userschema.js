const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema ({

    username: { 
        type: String , 
        minLength: 2 ,
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['student', 'doctor' , 'admin'], 
        required: true 
    }
} , {
    timestamps : true,
    discriminatorKey : 'role'
});

const User = mongoose.model('User', userSchema);

module.exports = User;