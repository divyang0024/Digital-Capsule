import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

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
        required:true,
    },
    profilePicture:{
        type:String //cloudinary
    },
    bio:{
        type:String,
        maxlength:200
    },
    description:{
        type:String,
        maxlength:1000
    },
    dob:{
        type:Date,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        default:null
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
}, {timestamps:true})


//storing the encrypted password in database for security purpose
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

//a method to compare passwords

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = async function(){
    const token = await jwt.sign({username:this.username, email:this.email}, process.env.JWT_KEY, {expiresIn:'1d'});
    this.token = token
    return token
}



export const User = mongoose.model("User", userSchema)