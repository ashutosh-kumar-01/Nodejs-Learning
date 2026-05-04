const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payments');
const courseRoutes = require('./routes/Course');



const database = require("./config/database");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { cloudinaryConnect } = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 4000;

// database connection
database.connect();
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

// cloudinary connection
cloudinaryConnect();

// routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/courses', courseRoutes);


// default route
app.get('/', (req, res) => {
    res.send('Welcome to the Study App API');
});

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});