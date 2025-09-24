const {body, validationResult} = require('express-validator');

const addProductValidation = [
    body('name').isString().withMessage('Name must be a string'),
    body('description').isString().withMessage('Description must be a string'),
    body('category').isString().withMessage('Category must be a string'),
    body('quantity').isNumeric().withMessage('Quantity must be a number'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('image').isString().withMessage('Image must be a string'),
]

const updateProductValidation = [
    body('name').isString().withMessage('Name must be a string'),
    body('description').isString().withMessage('Description must be a string'),
    body('category').isString().withMessage('Category must be a string'),
    body('quantity').isNumeric().withMessage('Quantity must be a number'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('image').isString().withMessage('Image must be a string'),
]

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    addProductValidation,
    updateProductValidation,
    validate
}