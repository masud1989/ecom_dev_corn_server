const express = require('express');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct, addToWishList, rating, uploadImages, deleteImages } = require('../controller/productController');
const { productImgResize, uploadPhoto } = require('../middleware/uploadImages');
const router = express.Router();


router.post('/createProduct', authMiddleware, isAdmin, createProduct);
router.get('/getProduct/:id', getProduct);
router.get('/getAllProducts',  getAllProducts);
router.post('/updateProduct/:id', authMiddleware, isAdmin, updateProduct);
router.post('/deleteProduct/:id', authMiddleware, isAdmin, deleteProduct);
router.post('/addToWishList', authMiddleware, addToWishList);
router.post('/rating', authMiddleware, rating);
router.post('/uploadImages', authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages);
router.post('/deleteImages/:id', authMiddleware, isAdmin, deleteImages);


module.exports = router;