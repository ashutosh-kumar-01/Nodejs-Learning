const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

// import routes
const employeeRoutes = require('./routes/employeeRoutes');

// mount routes
app.use('/api/v1/employees', employeeRoutes);

app.get('/api/v1/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy',
    });
});

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// connection to database
const dbConnect  = require('./config/database');
dbConnect();