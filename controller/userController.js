const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { generateToken } = require('../config/jwtToken');
const { generateRefreshToken } = require('../config/refreshToken');
const User = require('../model/userModel');
const Product = require('../model/productModel');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/sendMail');
const { error } = require('console');

// Register a user 
const register = asyncHandler(async (req, res) => {
    const postBody = req.body
    const email = postBody.email
    const existingUser = await User.findOne({email})
    if(!existingUser){
        const newUser = await User.create(postBody)
        // res.json({success: true, message: 'Registration Successful', newUser})
        res.json( newUser)
    }else{
        // res.json({success: false, message:'User already exist'})
        throw new Error('User Already Exist..')
    }
}
);

// Login as Admin 
const loginAdmin = asyncHandler(async (req, res) => {
    const postBody = req.body
    const {email, password} = postBody
    // console.log(email, password)
    const findAdmin = await User.findOne({email})
    const matchedPassword = await findAdmin.isPasswordMatched(password)
    if(findAdmin.role !== 'admin') throw new Error("Not Authorized User")
    if(findAdmin && matchedPassword){
        const refreshToken = await generateRefreshToken(findAdmin?._id)
        const updatedUser = await User.findByIdAndUpdate(findAdmin._id,{
            refreshToken: refreshToken,
        }, {new:true})
        res.cookie("refreshToken", refreshToken,{httpOnly: true, maxAge: 72 * 60 * 60 * 1000})
        res.json({
            _id: findAdmin?._id,
            firstName: findAdmin?.firstName,
            lastName: findAdmin?.lastName,
            email: findAdmin?.email,
            mobile: findAdmin.mobile,
            token: generateToken(findAdmin._id)
        });
    }else{
        throw new Error('Invalid Credentils..')
    }
    // if(!existingUser){
    //     const newUser = await User.create(postBody)
    //     // res.json({success: true, message: 'Registration Successful', newUser})
    //     res.json( newUser)
    // }else{
    //     // res.json({success: false, message:'User already exist'})
    //     throw new Error('User Already Exist..')
    // }
}
);
// Login a user 
const loginUser = asyncHandler(async (req, res) => {
    const postBody = req.body
    const {email, password} = postBody
    // console.log(email, password)
    const findUser = await User.findOne({email})
    const matchedPassword = await findUser.isPasswordMatched(password)
    if(findUser && matchedPassword){
        const refreshToken = await generateRefreshToken(findUser?._id)
        const updatedUser = await User.findByIdAndUpdate(findUser._id,{
            refreshToken: refreshToken,
        }, {new:true})
        res.cookie("refreshToken", refreshToken,{httpOnly: true, maxAge: 72 * 60 * 60 * 1000})
        res.json({
            _id: findUser?._id,
            firstName: findUser?.firstName,
            lastName: findUser?.lastName,
            email: findUser?.email,
            mobile: findUser.mobile,
            token: generateToken(findUser._id)
        });
    }else{
        throw new Error('Invalid Credentils..')
    }
    // if(!existingUser){
    //     const newUser = await User.create(postBody)
    //     // res.json({success: true, message: 'Registration Successful', newUser})
    //     res.json( newUser)
    // }else{
    //     // res.json({success: false, message:'User already exist'})
    //     throw new Error('User Already Exist..')
    // }
}
);

// handle Refresh token 
const refreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    // console.log(cookie);
    if (!cookie?.refreshToken) throw new Error('There in no Refresh Token in Header')
    const refreshToken = cookie.refreshToken
    // console.log(refreshToken);
    const user = await User.findOne({refreshToken})
    if (!user) throw new Error('No Refresh Token Present in DB or Not Matched')
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error('Something wrong with Refresh Token')
        }
        const accessToken = generateToken(user?._id)
        res.json({accessToken})
    })
});

//logout
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie.refreshToken) throw new Error('No Refresh Token available in Cookies')
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({refreshToken})
    console.log(user);
    if(!user){
        res.clearCookie("refreshToken", {httpOnly: true, secure: true})
        return res.sendStatus(204)
    }
    await User.findOneAndUpdate(refreshToken)
    res.clearCookie("refreshToken", {httpOnly: true, secure: true})
    res.sendStatus(204)
});

// Get all Users 
const getAllUsers = asyncHandler( async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json({Total:getUsers.length, users: getUsers})
    } catch (error) {
        throw new Error(error)
    }
});

// Get single User
const getUser = asyncHandler( async (req, res) => {
    const id = req.params.id
    try {
        const getUser = await User.findById(id)
        console.log(getUser)
        res.json({user: getUser})
    } catch (error) {
        throw new Error(error)
    }
});

// Get single User
const deleteUser = asyncHandler( async (req, res) => {
    const id = req.params.id
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        // console.log(deleteUser)
        res.json({user: deleteUser})
    } catch (error) {
        throw new Error(error)
    }
});

// Update User
const updateUser = asyncHandler( async (req, res) => {
    const { id } = req.user;
    console.log(req.user)
    // validateMongoDbId(_id);
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        },
        {
          new: true,
        }
      );
      res.json(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
});

// UnBlock User
const unBlockUser = asyncHandler( async (req, res) => {
    const {id} = req.params;
    // validateMongoDBId(id)
    let Data = {
      id,
      isBlocked:false
    }
    try {
      const unBlockedUser = await User.findByIdAndUpdate(id, Data)
      res.json({message: 'User has been UnBlocked Successfully', data: Data});
    } catch (error) {
      throw new Error(error);
    }
});

// Block User
const blockUser = asyncHandler( async (req, res) => {
    const {id} = req.params;
  // validateMongoDBId(id)
  let Data = {
    id,
    isBlocked:true
  }
  try {
    const blockedUser = await User.findByIdAndUpdate(id, Data)
    res.json({message: 'User has been Blocked Successfully', data: Data});
  } catch (error) {
    throw new Error(error);
  }
});

// Make User to Admin
const makeAdmin = asyncHandler( async (req, res) => {
    const {id} = req.params;
  // validateMongoDBId(id)
  let Data = {
    id,
    role:"admin"
  }
  try {
    const makedAdmin = await User.findByIdAndUpdate(id, Data)
    res.json({message: 'Admin Making Successful', data: Data});
  } catch (error) {
    throw new Error(error);
  }
});

// Make Admin to User
const makeUser = asyncHandler( async (req, res) => {
    const {id} = req.params;
  // validateMongoDBId(id)
  let Data = {
    id,
    role: "user"
  }
  try {
    const makedUser = await User.findByIdAndUpdate(id, Data)
    res.json({message: 'User Making Successful', data: Data});
  } catch (error) {
    throw new Error(error);
  }
});

//Update User Password
const updatePassword = asyncHandler( async (req, res) => {
  const id = req.user._id
  const password = req.body.password
  const user = await User.findById(id)
  if (password) {
    user.password = password
    const updatedPassword = await user.save()
    res.json(updatedPassword)
  }else{
    res.json(user)
  }
});

//User Password Reset Link by Email
const forgotPasswordToken = asyncHandler( async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({email})
  if(!user) throw new Error('User is not found for this Email Account')
  try {
    const token = await user.createPasswordResetToken()
    await user.save()
    const resetURL = `Hi, Please click the link to reset your password <a href='http://localhost:5000/user/resetPassword/${token}'>Click Here</a>`
    const data = {
      to: email,
      text: 'Hi, User..',
      subject: 'Forgot Password Link',
      htm: resetURL
    }
    sendEmail(data)
    res.json(token)
  } catch (error) {
    throw new Error(error)
  }
});

//Reset Usqer Password
const resetPassword = asyncHandler( async (req, res) => {
  const password = req.body.password
  const token = req.params.token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {$gt: Date.now()}
  })

  if (!user) throw new Error('Token Expired, Try again Later..')
  user.password = password
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()
  res.json(user)

});

const getWishList = asyncHandler( async (req, res) => {
  const id = req.user
  try {
      const getUser = await User.findById(id).populate("wishList")
      console.log(getUser)
      res.json({user: getUser})
  } catch (error) {
      throw new Error(error)
  }
});

const saveAddress = asyncHandler( async (req, res) => {
  const id = req.user
  try {
      const updateUser = await User.findByIdAndUpdate(
        id, 
        {
          address: req?.body?.address
        }, 
        {
          new: true
        }
        )
      res.json({message: 'Address Saved', user: updateUser})
  } catch (error) {
      throw new Error(error)
  }
});



module.exports = {register, loginUser, loginAdmin, getAllUsers, getUser, deleteUser, updateUser, unBlockUser, blockUser, refreshToken, logout, makeAdmin, makeUser, updatePassword, forgotPasswordToken, resetPassword, getWishList, saveAddress}