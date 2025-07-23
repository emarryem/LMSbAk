const mongoose = require("mongoose");
const User = require("./Userschema");

const studentSchema = new mongoose.Schema({
    enrolledCourses: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course" 
    }],
    Grades: [{
        course: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Course" 
        },
        grade: { 
            type: String, 
            required: true 
        }
    }]
});

module.exports = User.discriminator("Student", studentSchema);
