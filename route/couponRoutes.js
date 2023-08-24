const express = require('express');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { createCoupon, getAllCoupons, getCoupon, deleteCoupon, updateCoupon } = require('../controller/couponController');
const router = express.Router();

router.post('/createCoupon', authMiddleware, isAdmin, createCoupon);
router.get('/getAllCoupons', authMiddleware, getAllCoupons);
router.get('/getCoupon/:id', authMiddleware, getCoupon);
router.post('/deleteCoupon/:id', authMiddleware, isAdmin, deleteCoupon);
router.post('/updateCoupon/:id', authMiddleware, isAdmin, updateCoupon);

module.exports = router;