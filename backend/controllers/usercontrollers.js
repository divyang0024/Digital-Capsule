import catchasyncerrors from "../middlewares/catchasyncerrors.js";
import { User } from "../db/user.models.js";
import { sendToken } from "../utils/jwtToken.js";
import { ErrorHandler } from "../utils/errorhandler.js"
import cloudinary from "cloudinary";

// register user
const registerUser = catchasyncerrors(async (req, res, next) => {
  console.log(req.body);
  const { name, username, email, password, gender } = req.body;

  const user = await User.create({
    name, username, email, gender, password
  });

  sendToken(user, 201, res);

});

// login user
const loginUser = catchasyncerrors(async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

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
const logoutUser = (req, res) => {
 
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
    path: '/',
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};



// get user details
const getUserDetails = catchasyncerrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//verify if user exists.
const checkEmailExists = async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
        exists: false,
      });
    }
    res.status(200).json({
      success: true,
      exists: true,
    });
  } catch (error) {
    return next(new ErrorHandler('Error checking email existence', 500));
  }
};

const inviteUserToCapsule = async (req, res, next) => {
  const { email, capsuleId } = req.body; // Get the email and capsuleId from the request body

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // If the user with the email doesn't exist, respond with an error
      return next(new ErrorHandler('User with the given email does not exist', 404));
    }

    // Add the capsuleId to the capsulesInvited array
    if (!user.capsulesInvited.includes(capsuleId)) {
      user.capsulesInvited.push(capsuleId);
      await user.save(); // Save the updated user document
    }

    res.status(200).json({
      success: true,
      message: 'User invited to capsule successfully',
    });
  } catch (error) {
    return next(new ErrorHandler('Error inviting user to capsule', 500));
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  checkEmailExists,
  inviteUserToCapsule,
}