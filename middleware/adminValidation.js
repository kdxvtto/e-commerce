const {body, validationResult} = require('express-validator');

const addAdminValidation = [
    body('name').isString().withMessage('Name must be a string'),
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isString().withMessage('Password must be a string'),
]

const updateAdminValidation = [
    body('name').isString().withMessage('Name must be a string'),
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isString().withMessage('Password must be a string'),
]

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    addAdminValidation,
    updateAdminValidation,
    validate
}