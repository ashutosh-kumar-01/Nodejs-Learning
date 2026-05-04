const mongoose = require('mongoose');

require('dotenv').config();

exports.connect = () => {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/studyapp";

    mongoose.connect(mongoUri)
    .then(() => {
        console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });
};