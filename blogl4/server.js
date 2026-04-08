const express = require('express');
const app = express();

// best way to start server
// load config from .env file
// require('dotenv').config();
require("dotenv").config({ quiet: true });
const PORT = process.env.PORT || 4000;

// middleware to parse JSON request body
app.use(express.json());

// import routes
const blog = require('./routes/blog');
// mount routes
app.use('/api/v1', blog);

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// connection to database
const dbConnect  = require('./config/database');
dbConnect();

// default route
app.get('/', (req, res) => {
    res.send("Welcome to the BLOG APP");
});

// this is for testing purpose only, to check if the server is running
app.get('/test', (req, res) => {
    res.send("This is a test route");
});