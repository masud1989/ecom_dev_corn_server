const express = require('express');
const { createBrand, updateBrand, deleteBrand, getBrand, getAllBrand, uploadImages } = require('../controller/brandController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { uploadPhoto, brandImgResize } = require('../middleware/uploadImages');
const router = express.Router();

router.post('/createBrand', authMiddleware, isAdmin, createBrand);
router.post('/updateBrand/:id', authMiddleware, isAdmin, updateBrand);
router.post('/deleteBrand/:id', authMiddleware, isAdmin, deleteBrand);
router.get('/getBrand/:id', authMiddleware, isAdmin, getBrand);
router.get('/getAllBrand', authMiddleware, isAdmin, getAllBrand);
router.post('/uploadImages/:id', authMiddleware, isAdmin, uploadPhoto.array("images", 10), brandImgResize, uploadImages);



module.exports = router;