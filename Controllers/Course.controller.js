const fs = require('fs');
const courseModel=require('../models/Courseschema');


exports.getAllCourses = async (req, res) => {
    try {
        let courses = await courseModel.find();
        res.status(200).json({ message: 'success', data: courses });
    } catch (error) {
        res.status(400).json({ message: 'failed to get courses' });
    }
}
exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await courseModel.findById(id).populate('doctor').populate('assignments');
        if (!course) {
            res.status(404).json({ message: 'Course is not found' });
        } else {
            res.status(200).json({ message: `Course with id ${id} found`, data: course });
        }
    } catch (error) {
        res.status(400).json({ message: 'failed' });
    }
}

exports.createCourse = async (req, res) => {
    const course = req.body;
    try {
        const newCourse = await courseModel.create(course);
        res.status(201).json({ message: 'create success', data: newCourse });
    } catch (error) {
        res.status(400).json({ message: `couldn't create`, error: error.message });
    }
}
exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await courseModel.findByIdAndDelete(id);
        if (!course) {
            res.status(404).json({ message: 'course is not found' });
        } else {
            res.status(200).json({ message: "deleted" });
        }
    } catch (error) {
        res.status(400).json({ message: 'failed' });
    }
};

exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const course = await courseModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!course) {
            res.status(404).json({ message: 'course is not found' });
        } else {
            res.status(200).json({ message: "updated", data: course });
        }
    } catch (error) {
        res.status(400).json({ message: 'failed' });
    }
};


exports.getCoursesByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const courses = await courseModel.find({ userId });
        if (courses.length === 0) {
            return res.status(404).json({ message: 'No courses found for this user' });
        }
        res.status(200).json({ message: 'success', data: courses });
    } catch (error) {
        res.status(400).json({ message: 'Failed to get courses for user' });
    }
};