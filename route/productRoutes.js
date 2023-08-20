const express = require('express');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct, addToWishList } = require('../controller/productController');
const router = express.Router();


router.post('/createProduct', authMiddleware, isAdmin, createProduct);
router.get('/getProduct/:id', getProduct);
router.get('/getAllProducts',  getAllProducts);
router.post('/updateProduct/:id', authMiddleware, isAdmin, updateProduct);
router.post('/deleteProduct/:id', authMiddleware, isAdmin, deleteProduct);
router.post('/addToWishList', authMiddleware, addToWishList);


module.exports = router;