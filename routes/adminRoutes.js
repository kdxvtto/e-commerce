const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');
const adminValidation = require('../middleware/adminValidation');

const {
    getAllAdmins,
    getAdminById,
    addAdmin,
    updateAdmin,
    deleteAdmin
} = require('../controllers/adminController');

router.get('/', verifyToken, checkRole('admin'), getAllAdmins);
router.get('/:id', verifyToken, checkRole('admin'), getAdminById);
router.post('/', verifyToken, checkRole('admin'), adminValidation.addAdminValidation, addAdmin);
router.put('/:id', verifyToken, checkRole('admin'), adminValidation.updateAdminValidation, updateAdmin);
router.delete('/:id', verifyToken, checkRole('admin'), deleteAdmin);

module.exports = router;

