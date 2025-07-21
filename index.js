const express = require('express');
const fs = require('fs');
const mongoose= require('mongoose');
const dotenv= require('dotenv');


const app = express();
const port = 3333;
const courseRoutes = require('./Routes/course.routes.js');
const enrollmentRoutes = require('./Routes/enrollment.routes.js');
const { constants } = require('buffer');

app.use(express.json());

// Mounting the routes
app.use('/courses', courseRoutes);
app.use('/enrollments', enrollmentRoutes);
dotenv.config();


// Test route
app.get('/test', (req, res) => {
    res.send('test done');
});

mongoose.connect('mongodb://127.0.0.1:27017/UniversityDBProject')
.then(()=>console.log("connected"))
.catch((error)=>console.log(error));


// Start the server
app.listen(port, () => {
    console.log(`listening success on port ${port}`);
});
