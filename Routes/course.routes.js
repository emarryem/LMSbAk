const express = require('express');
const router =express.Router()

const auth = require('../Middlewares/auth.middleware');
const restrictTo = auth.authorize;
const {getAllCourses,getById,createCourse,updateCourse,deleteCourse,getCoursesByUser} = require('../Controllers/course.controller');

router.get('/', getAllCourses)

router.get('/:id',getById )

router.post('/',createCourse)

//router.patch('/:id',auth,restrictTo('doctor','admin'),updateCourse )

//router.delete('/:id',auth,restrictTo('admin'),deleteCourse)

router.get('/users/:userId', getCoursesByUser);

// router.get('/view/api',viewAllTodos)
module.exports = router; 