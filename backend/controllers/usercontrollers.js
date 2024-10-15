import catchasyncerrors from "../middlewares/catchasyncerrors.js";
import { User } from "../db/user.models.js";
import { sendToken } from "../utils/jwtToken.js";
import { ErrorHandler }from "../utils/errorhandler.js"
import cloudinary from "cloudinary";

// register user
const registerUser=catchasyncerrors(async(req,res,next)=>{

const {name,username,email,password,gender}=req.body;
console.log(req.body.avatar);
const user=await User.create({
    name,username,email,gender,password
});

sendToken(user,201,res);

});

// login user
const loginUser=catchasyncerrors(async(req,res,next)=>{

const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

const user=await User.findOne({email}).select("+password");

 if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

// logout user
const logoutUser=catchasyncerrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// get user details
const getUserDetails=catchasyncerrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});


export{
    registerUser,
    loginUser,
    logoutUser,
    getUserDetails,
}