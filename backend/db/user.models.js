import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
    },
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:[true, "This username is already taken"]
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:[true, "This email is already registered"]
    },
    password:{
        type:String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    phone:{
        type:Number,
    },
    profilePicture:{
        type:String
    },
    bio:{
        type:String,
        maxlength:200
    },
    description:{
        type:String,
        maxlength:1000
    },
    gender:{
        type:String,
        required:true,
    },
    capsulesCreated: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Capsule", 
    }],
    capsulesInvited: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Capsule", 
    }],
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
}, {timestamps:true});

//encrypts the password before saving it into the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//genrates jwt token when user registers or login
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//verify password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema)