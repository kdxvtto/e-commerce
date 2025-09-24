const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');
const productValidation = require('../middleware/productValidation');
const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', verifyToken, checkRole('admin'), productValidation.addProductValidation, addProduct);
router.put('/:id', verifyToken, checkRole('admin'), productValidation.updateProductValidation, updateProduct);
router.delete('/:id', verifyToken, checkRole('admin'), deleteProduct);

module.exports = router;