import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true,
    },
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
    phone:{
        type:Number,
    },
    profilePicture:{
        type:String //cloudinery
    },
    bio:{
        type:String,
        maxlength:200
    },
    description:{
        type:String,
        maxlength:1000
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:[true, "This email is already registered"]
    },
    dateOfBirth:{
        type:Date,
        required:true,
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
}, {timestamps:true})

export const User = mongoose.model("User", userSchema)