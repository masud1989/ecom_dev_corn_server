const Coupon = require('../model/couponModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDBId');

const createCoupon = asyncHandler( async (req, res) => {
    try {
        const postBody = req.body
        const newCoupon = await Coupon.create(postBody);
        res.json({
            status: 'success',message: 'New Coupon Created', data: newCoupon
        })
    } catch (error) {
        throw new Error(error);
    }
});

const getAllCoupons = asyncHandler( async (req, res) => {
    try {
        const allCoupons = await Coupon.find();
        res.json({   
          status: 'success',
          total: allCoupons.length, 
          data: allCoupons
        })
    } catch (error) {
        throw new Error(error);
    }
});

const getCoupon = asyncHandler( async (req, res) => {
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const coupon = await Coupon.findById(id);
        res.json({   
          status: 'success',
          data: coupon
        })
    } catch (error) {
        throw new Error(error);
    }
});

const deleteCoupon = asyncHandler( async (req, res) => {
  const {id} = req.params
  validateMongoDbId(id)
  try {
      const deletedCoupon = await Coupon.findByIdAndDelete(id);
      res.json({   
        status: 'success',
        message: 'Coupon Deleted Success',
        data: deletedCoupon
      })
  } catch (error) {
      throw new Error(error);
  }
});

const updateCoupon = asyncHandler( async (req, res) => {
  const {id} = req.params
  validateMongoDbId(id)
  const postBody = req.body
  try {
      const coupon = await Coupon.findByIdAndUpdate(id, postBody);
      res.json({   
        status: 'success',
        message: 'Coupon Updated'
      })
  } catch (error) {
      throw new Error(error);
  }
});

  

module.exports = {createCoupon, getAllCoupons, getCoupon, deleteCoupon, updateCoupon};