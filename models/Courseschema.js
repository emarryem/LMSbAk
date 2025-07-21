const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    description: String,
    title: { type: String, 
        required: true 
    },
    assignments: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment"
    }] ,
    doctor: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", required: true
    },
}, {
        timestamps: true
    });

module.exports = mongoose.model("Course", courseSchema);
