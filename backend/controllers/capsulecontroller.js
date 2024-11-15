import { Capsule } from "../db/capsule.models.js";
import { User } from "../db/user.models.js";
import catchAsyncErrors from "../middlewares/catchasyncerrors.js";
import { ErrorHandler } from "../utils/errorhandler.js";
import cloudinary from "cloudinary";
import multer from "multer";
import { sendInvitationEmail } from "../utils/sendEmail.js";

const storage = multer.memoryStorage();
const upload = multer({ storage }); 

//create capsule
const createCapsule = catchAsyncErrors(async (req, res, next) => {
  const { title, description, content, visibility, releaseAt, friends } = req.body;

  if (!title || !description || !content || !releaseAt) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  let media = [];
  if (req.files && req.files.length > 0) {
    media = await Promise.all(
      req.files.map(async (file) => {
        const result = await new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload_stream({ folder: "capsule_images" }, (error, result) => {
            if (error) {
              reject(new ErrorHandler("Image upload failed", 500));
            }
            resolve({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }).end(file.buffer);
        });
        return result;
      })
    );
  }

  const newCapsule = await Capsule.create({
    title,
    description,
    content,
    createdBy: req.user.id,
    media,
    visibility: visibility || "private",
    isOpened: false,
    releaseAt,
  });

  const user = await User.findById(req.user.id);
  user.capsulesCreated.push(newCapsule._id);
  await user.save();

  await sendInvitationEmail(friends, newCapsule._id);

  res.status(201).json({
    success: true,
    message: "Capsule created successfully and invitations sent",
    data: newCapsule,
  });
});

//get user data
const getUserCapsules = catchAsyncErrors(async (req, res, next) => {
  const myCapsules = await Capsule.find({ createdBy: req.user.id }); 

  res.status(200).json({
    success: true,
    message: myCapsules.length > 0 ? "Capsules retrieved successfully" : "No capsules made yet",
    data: myCapsules,  
  });
});

//update capsule status
const updateCapsuleStatus=catchAsyncErrors(async (req, res, next) => {
  const capsule = await Capsule.findByIdAndUpdate(req.body.userId, {isOpen:true});
  res.status(200).json({
    success: true,
    data:capsule,
    msg:"capsule status updated", 
  });
});

export { createCapsule,getUserCapsules,updateCapsuleStatus, upload };
