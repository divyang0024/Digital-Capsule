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
  media: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],

  comments: [commentSchema],

  visibility: {
    type: String, 
    default: "private",
  },
  
  isOpen: {
    type: Boolean,
    default: false,
  },
 releaseAt: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

export const Capsule = mongoose.model("Capsule", capsuleSchema);
