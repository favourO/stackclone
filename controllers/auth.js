const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');


// @desc    Register User
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    const user = await User.create({
        username, email, password
    })

    const token = user.getSignedJwtToken();
    res.status(201).json({
        success: true,
        token
    })
})


// @desc      login User
// @access    Public
// @route     /api/auth/login
exports.login = asyncHandler( async(req, res, next) => {
    const { email, password } = req.body;
  
    // Validate email and password
    if(!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }
  
    // Check if user exist
    const user = await User.findOne({email}).select('+password');
  
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
  
    // Check if password matches
    const isMatch = await user.matchPassword(password);
  
    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }
  
    // return token
    sendTokenResponse(user, 200, res)
  })
  // Get token from model, create cookie and send response
  const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
  
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true // enable cookie for client side 
    }
  
    // Set cookies to secured in prod (http(s))
    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }
  
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
        })
};


// @desc    Get current logged in user
// @route   POST /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
  
    res.status(200).json({
        success: true,
        user
    })
  })
  
  
  
  //  @desc   logout current logged in user / clear
  //  @route  POST  /api/auth/logout
  //  @access Private
  exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
  })
  
  res.status(200).json({
      success: true
    })
})
  