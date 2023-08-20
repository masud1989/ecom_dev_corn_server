const Product = require("../model/productModel");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const newProduct = await Product.create(req.body);
      res.json({message: 'Product Created Successfully', newProduct});
    } catch (error) {
      throw new Error(error);
    }
});

const getProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    try {
      const product = await Product.findById(id);
      res.json({message: 'Product Got Successfully', product});
    } catch (error) {
      throw new Error(error);
    }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try{
   // Filtering 
   const queryObj = {...req.query};
   const excludeFields = ["page", "sort", "limit", "fields"]
   excludeFields.forEach( (el) => delete queryObj[el])
   console.log(queryObj)
   let queryStr = JSON.stringify(queryObj)
   queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
   let query = Product.find(JSON.parse(queryStr))
  
   // Sorting 
    if(req.query.sort){
       const sortBy = req.query.sort.split(",").join(" ")
       query = query.sort(sortBy)
    }else{
       query = query.sort("-createdAt")
    }

   //  Limiting the fields
   if (req.query.fields) {
       const fields = req.query.fields.split(",").join(" ")
       query = query.select(fields)
   } else {
       query = query.select(" ")
   }

   //Pagination
   const page = req.query.page;
   const limit = req.query.limit;
   const skip = (page - 1) * limit;
   query = query.skip(skip).limit(limit);

   if(req.query.page){
       const productCount = await Product.countDocuments();
       if(skip >= productCount) throw new Error ('This Page does not exist')
   }
   // console.log(page, limit, skip)

   const products = await query
   res.json({TotalData: products.length, products}) 
} catch (error) {
   throw new Error(error)
}   
});

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)    
        }
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new : true});
      res.json({message: 'Product Updated Successfully', updatedProduct});
    } catch (error) {
      throw new Error(error);
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      res.json({message: 'Product Deleted Successfully', deletedProduct});
    } catch (error) {
      throw new Error(error);
    }
});

const addToWishList = asyncHandler( async (req, res) => {
  const {_id} = req.user
  const {productId} = req.body
 try {
    const user = await User.findById(_id)
    const alreadyAdded = user.wishList.find( (id) => id.toString() === productId)
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(_id, 
      {
        $pull: {wishList: productId}
      }, 
      {
        new: true
      }
      )
      res.json(user)
    }else{
      let user = await User.findByIdAndUpdate(_id, 
      {
        $push: {wishList: productId}
      },
      {
        new: true
      } 
      )
      res.json(user)
    }
 } catch (error) {
    throw new Error(error)
 }

});





  module.exports = {createProduct, getProduct, getAllProducts, updateProduct, deleteProduct, addToWishList}