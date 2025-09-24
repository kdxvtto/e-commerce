const {body, validationResult} = require('express-validator');

const addOrderValidation = [
    body('orderNumber').isString().withMessage('Order number must be a string'),
    body('items').isArray().withMessage('Items must be an array'),
    body('totalAmount').isNumeric().withMessage('Total amount must be a number'),
    body('status').isString().withMessage('Status must be a string'),
]

const updateOrderValidation = [
    body('orderNumber').isString().withMessage('Order number must be a string'),
    body('items').isArray().withMessage('Items must be an array'),
    body('totalAmount').isNumeric().withMessage('Total amount must be a number'),
    body('status').isString().withMessage('Status must be a string'),
]

module.exports = {
    addOrderValidation,
    updateOrderValidation
}