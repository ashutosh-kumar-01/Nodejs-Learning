const express = require('express');
const app = express();


// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

// best way to start server
// load config from .env file
// require('dotenv').config();
require("dotenv").config({ quiet: true });
const PORT = process.env.PORT || 4000;

// middleware to parse JSON request body
app.use(express.json());


// import routes for todo api
const todoRoutes = require('./routes/todo');

// mount the todo API routes
app.use('/api/v1', todoRoutes);

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// connection to database
const dbConnect  = require('./config/database');
dbConnect();


// default route
app.get('/', (req, res) => {
    res.send("Welcome to the Todo API");
});


