const mongoose = require("mongoose");
const User = require("./User");

const studentSchema = new mongoose.Schema({
    enrolledCourses: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course" 
    }]
});

module.exports = User.discriminator("Student", studentSchema);
