const enrollmentModel=require('../models/Enrollmenschema');

exports.getAllEnrollments = async (req, res) => {
    try {
        let enrollments = await enrollmentModel.find();
        res.status(200).json({ message: 'success', data: enrollments });
    } catch (error) {
        res.status(400).json({ message: 'failed to get enrollments' });
    }
}

exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const enrollment = await enrollmentModel.findById(id);
        if (!enrollment) {
            res.status(404).json({ message: 'Enrollment is not found' });
        } else {
            res.status(200).json({ message: `Enrollment with id ${id} found`, data: enrollment });
        }
    } catch (error) {
        res.status(400).json({ message: 'failed to get enrollment' });
    }
}

exports.createEnrollment = async (req, res) => {
    const enrollment = req.body;
    try {
        const newEnrollment = await enrollmentModel.create(enrollment);
        res.status(201).json({ message: 'create success', data: newEnrollment });
    } catch (error) {
        res.status(400).json({ message: `couldn't create`, error: error.message });
    }
}

exports.updateEnrollment = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const enrollment = await enrollmentModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!enrollment) {
            res.status(404).json({ message: 'Enrollment is not found' });
        } else {
            res.status(200).json({ message: "updated", data: enrollment });
        }
    } catch (error) {
        res.status(400).json({ message: 'failed to update enrollment' });
    }
}
exports.deleteEnrollment = async (req, res) => {
    const { id } = req.params;
    try {
        const enrollment = await enrollmentModel.findByIdAndDelete(id);
        if (!enrollment) {
            res.status(404).json({ message: 'Enrollment is not found' });
        } else {
            res.status(200).json({ message: "deleted" });
        }
    } catch (error) {
        res.status(400).json({ message: 'failed to delete enrollment' });
    }
}

exports.getEnrollmentsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const enrollments = await enrollmentModel.find({ userId });
        if (enrollments.length === 0) {
            return res.status(404).json({ message: 'No enrollments found for this user' });
        }
        res.status(200).json({ message: 'success', data: enrollments });
    } catch (error) {
        res.status(400).json({ message: 'Failed to get enrollments for user' });
    }
};