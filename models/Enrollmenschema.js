const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Student", 
        required: true 
    },
    enrolledAt: { 
        type: Date, 
        default: Date.now 
    },
    course: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course", 
        required: true 
    },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
