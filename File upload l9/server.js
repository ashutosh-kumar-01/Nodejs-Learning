// create app
const express = require('express');
const app = express();

// port set karna hai
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;

// middleware set karna hai
app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(fileUpload());


// db se connect karna hai
const db = require('./config/database');
db.connect();

// cloudinary se connect karna hai
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();


// routes create karna hai
const upload = require('./routes/fileUpload');
app.use('/api/v1', upload);


// server start karna hai
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

