const express = require('express');
const router =express.Router()
// const {auth,ristrictTo}=require('../middleware/auth.middleware');
const fs = require('fs');

const {getAllCourses,getById,createCourse,updateCourse,deleteCourse,getCoursesByUser,viewAllTodos} = require('../controller/course.controller');

router.get('/', getAllCourses)

router.get('/:id',getById )

router.post('/',createCourse)

router.patch('/:id',auth,ristrictTo('user','admin'),updateCourse )

router.delete('/:id',auth,ristrictTo('admin'),deleteCourse)

router.get('/users/:userId', getCoursesByUser);

router.get('/view/api',viewAllTodos)
module.exports = router; 