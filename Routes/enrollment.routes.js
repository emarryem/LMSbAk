const express = require('express');
const router = express.Router()
const auth = require('../Middlewares/auth.middleware');
const restrictTo = auth.authorize;
const authenticate = auth.authenticate;
const { getAllEnrollments, getById, createEnrollment, updateEnrollment, deleteEnrollment, getEnrollmentsByUser } = require('../Controllers/Enrolment.controller');

router.get('/', getAllEnrollments)

router.get('/:id', getById)

router.get('/users/:userId', getEnrollmentsByUser);

router.post('/', createEnrollment)

router.patch('/:id', updateEnrollment)

router.delete('/:id', deleteEnrollment)

// router.post('/refreshToken', refreshToken)

module.exports = router; 