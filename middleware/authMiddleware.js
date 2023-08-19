const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

const authMiddleware = asyncHandler( async(req, res, next) => {
    let token
    if(req.headers){
        token = req.headers.token
        try {
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                // console.log(decoded)
                const user = await User.findById(decoded?.id)
                req.user = user
                console.log(req.user)
                next()
            }
        } catch (error) {
            throw new Error ('Authorization token Expired, Login Again')
        }
    }else{
        throw new Error('There is no authorization Header')
    }
});

const isAdmin = asyncHandler( async(req, res, next) => {
    const {email} = req.user
    const adminUser = await User.findOne({email})
    if(adminUser.role !== 'admin'){
        throw new Error('You are not Admin User')
    }else{
        next()
    }

})

module.exports = {authMiddleware, isAdmin}