const clodinary = require('cloudinary').v2;
require('dotenv').config();

exports.cloudinaryConnect = () => {
    try {
        clodinary.config({
        cloud_name: process.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    } catch (error) {
        console.error('Error connecting to Cloudinary:', error);
    }
}