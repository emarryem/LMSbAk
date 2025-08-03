const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');


//!! VIEW !!//
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./Views/swagger.json');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.set('view engine','pug');
// app.set('views','./Views')

app.use(express.json());

app.use('/user', require('./Routes/user.routes'));
app.use('/course', require('./Routes/course.routes'));
app.use('/enrollment', require('./Routes/enrollment.routes'));

mongoose.connect('mongodb://localhost:27017/Project').then(() => {   // rewrite the DB name According to how u named it
    console.log('Connected to MongoDB');
});

app.use(express.json());
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});