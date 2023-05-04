const express = require('express');
const dotenv = require('dotenv').config(); // dotenv is a package we can use to hide sensitive data.
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000; // process.env retrieves the port we set our app too in the .env file in the root directory.

connectDB();

const app = express();

app.use(express.json()); // Used to display JSON data.
app.use(express.urlencoded({extended: false})); // allows us to use URL related data like with forms. Thus, provinding the ability to seperete betwen NAME and EMAIL data from a form. False indicates string and array, true would indicate it can take the form of nested objects and arrays.

app.use('/api/ToDo', require('./routes/routes')); // This fowards all calls/request to the URL to the routes file.
app.use('/api/users', require('./routes/userRoutes')); 

app.use(errorHandler); // Using custom error handler

app.listen(port, () => console.log(port, "Server up and running"));