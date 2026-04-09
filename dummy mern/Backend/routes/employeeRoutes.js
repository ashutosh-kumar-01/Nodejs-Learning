const express = require('express');
const {
    createEmployee,
    getAllEmployees,
} = require('../controller/employeeController');

const router = express.Router();

router.post('/', createEmployee);
router.get('/', getAllEmployees);

module.exports = router;
