const mongoose = require("mongoose");
const User = require("./Userschema");

const doctorSchema = new mongoose.Schema({
    teachingCourses: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course" 
    }]
});

module.exports = User.discriminator("doctor", doctorSchema);
