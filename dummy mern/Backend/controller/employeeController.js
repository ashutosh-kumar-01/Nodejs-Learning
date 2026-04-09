const Employee = require('../models/employeeModel');

exports.createEmployee = async (req, res) => {
    try {
        const { name, email, role, salary } = req.body;

        if (!name || !email || !role || salary === undefined) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: name, email, role, salary',
            });
        }

        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(409).json({
                success: false,
                message: 'Employee with this email already exists',
            });
        }

        const employee = await Employee.create({
            name,
            email,
            role,
            salary,
        });

        return res.status(201).json({
            success: true,
            message: 'Employee created successfully',
            data: employee,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create employee',
            error: error.message,
        });
    }
};

exports.getAllEmployees = async (_req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: 'Employees fetched successfully',
            count: employees.length,
            data: employees,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch employees',
            error: error.message,
        });
    }
};
