const express = require('express');
const { register, login } = require('../controllers/authController');
const { check } = require('express-validator');

const router = express.Router();

router.post('/register', [
    check('username').not().isEmpty(),
    check('password').isLength({ min: 6 }),
    check('role').isIn(['User', 'Admin']),
], register);

router.post('/login', [
    check('username').not().isEmpty(),
    check('password').not().isEmpty(),
], login);

module.exports = router;
