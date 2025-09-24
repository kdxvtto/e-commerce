const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const orderValidation = require('../middleware/orderValidation');
const checkRole = require('../middleware/checkRole');

const {
    getAllOrder,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController');

router.get('/', getAllOrder);
router.get('/:id', getOrderById);
router.post('/', orderValidation.addOrderValidation, addOrder);
router.put('/:id', verifyToken, checkRole('admin'), orderValidation.updateOrderValidation, updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;