const express = require('express');
const { createCategory, updateCategory, deleteCategory, getCategory, getAllCategory } = require('../controller/productCategoryController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, isAdmin, createCategory);
router.post('/update/:id', authMiddleware, isAdmin, updateCategory);
router.post('/delete/:id', authMiddleware, isAdmin, deleteCategory);
router.get('/getCategory/:id', authMiddleware, isAdmin, getCategory);
router.get('/getAllCategory', authMiddleware, isAdmin, getAllCategory);


module.exports = router;