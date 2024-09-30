import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: false });

const capsuleSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String, 
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  media: [{
    type: String, 
  }],

  tags: [{
    type: String, 
  }],

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],

  comments: [commentSchema],

  visibility: {
    type: String, //public, private
    default: "public",
  },

  status: {
    type: String,
    default: "published",
  },

}, { timestamps: true });

export const Capsule = mongoose.model("Capsule", capsuleSchema);
