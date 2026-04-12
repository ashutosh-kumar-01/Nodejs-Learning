const express = require('express');
const router = express.Router();

const {login, signup} = require('../controllers/auth');
const {auth, isStudent, isAdmin} = require('../middlewares/auth');


router.post('/signup', signup);
router.post('/login', login);

router.get('/test', auth, (req, res) => {
    res.json({
        success: true,
        message: 'This is a protected route',
    });
})
// protected route 
router.get('/student',auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome student',
    });
})

router.get('/admin', auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome admin',
    });
})
module.exports = router;