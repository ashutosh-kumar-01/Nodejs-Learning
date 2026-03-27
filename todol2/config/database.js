const mongoose = require('mongoose');

// require('dotenv').config();
require("dotenv").config({ quiet: true });

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
        process.exit(1); // Exit the process with an error code
    });
}

module.exports = dbConnect;