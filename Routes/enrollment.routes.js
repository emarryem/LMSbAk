const express = require('express');
const router = express.Router()
const fs = require('fs');

const { getAllEnrollments, getById, createEnrollment, updateEnrollment, deleteEnrollment, login, refreshToken } = require('../controller/Enrollments.controller');

router.get('/', getAllEnrollments)

router.get('/:id', getById)

router.post('/', createEnrollment)

router.patch('/:id', updateEnrollment)

router.delete('/:id', deleteEnrollment)

router.post('/login', login)

router.post('/refreshToken', refreshToken)

module.exports = router; 