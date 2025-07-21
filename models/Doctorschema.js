const mongoose = require("mongoose");
const User = require("./User");

const teacherSchema = new mongoose.Schema({
    teachingCourses: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course" 
    }]
});

module.exports = User.discriminator("Doctor", doctorSchema);
