const Brand = require('../model/brandModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDBId');
const fs = require('fs');
const { cloudinaryUploadImage } = require('../utils/cloudinary');

const createBrand = asyncHandler( async(req, res) => {
    const postBody = req.body
    try {
        const newBrand = await Brand.create(postBody)
        res.json({status: 'success', message: 'Brand Created', data: newBrand})
    } catch (error) {
        throw new Error(error)
    }
});

const updateBrand = asyncHandler( async(req, res) => {
    const postBody = req.body
    const id = req.params.id
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(id, postBody, {new: true})
        res.json({status: 'success', message: 'Brand Updated', data: updatedBrand})
    } catch (error) {
        throw new Error(error)
    }
});

const deleteBrand = asyncHandler( async(req, res) => {
    const id = req.params.id
    try {
        const deletedBrand = await Brand.findByIdAndDelete(id)
        res.json({status: 'success', message: 'Product Deleted', data: deletedBrand})
    } catch (error) {
        throw new Error(error)
    }
});

const getBrand = asyncHandler(async (req, res) => {
    const  id  = req.params.id;
    validateMongoDbId(id);
    try {
      const brand = await Brand.findById(id);
      res.json(brand);
    } catch (error) {
      throw new Error(error);
    }
});

  const getAllBrand = asyncHandler(async (req, res) => {
    try {
      const getAllBrands = await Brand.find();
      res.json({total: getAllBrands.length, getAllBrands});
    } catch (error) {
      throw new Error(error);
    }
});

const uploadImages = asyncHandler( async(req, res) => {
  // console.log(req.files)
  const id = req.params.id;
  try {
      const uploader = (path) => cloudinaryUploadImage(path, "images")
      const urls = [];
      const files = req.files;
      console.log(files)

      for(const file of files){
          const {path} = file;
          const newPath = await uploader(path);
          urls.push(newPath)
          fs.unlinkSync(path)
      }

      const findBrand = await Brand.findByIdAndUpdate(id, {
          images: urls.map( (file) => {
              return file;
          })
      }, 
      {
          new: true
      }
      )
  res.json(findBrand)

  } catch (error) {
      throw new Error(error)
  }
});


module.exports = {createBrand, updateBrand, deleteBrand, getBrand, getAllBrand, uploadImages}