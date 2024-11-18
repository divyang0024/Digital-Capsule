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

  const validFriends = Array.isArray(friends)
    ? friends
      .map((email) => email.toLowerCase())
      .filter((email, index, arr) => arr.indexOf(email) === index)
    : [];

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
    visibility: visibility,
    isOpened: false,
    releaseAt,
  });

  const user = await User.findById(req.user.id);
  user.capsulesCreated.push(newCapsule._id);
  await user.save();

  if (visibility === "private" && validFriends.length > 0) {
    await sendInvitationEmail(validFriends, newCapsule._id, req.user, newCapsule);
  }

  res.status(201).json({
    success: true,
    message: "Capsule created successfully" + (visibility === "private" && friends?.length > 0 ? " and invitations sent" : ""),
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
const updateCapsuleStatus = catchAsyncErrors(async (req, res, next) => {
  const { capsuleIds } = req.body; // Receiving multiple capsuleIds from the request body

  // Update the `isOpen` status for multiple capsules
  const updatedCapsules = await Capsule.updateMany(
    { _id: { $in: capsuleIds } },
    { $set: { isOpen: true } }
  );

  res.status(200).json({
    success: true,
    data: updatedCapsules,
    msg: "Capsule status updated",
  });
});


//get user private capsule
const getUserPrivateCapsule = catchAsyncErrors(async (req, res, next) => {
  const { capsulesInvited } = req.user;

  if (!capsulesInvited || capsulesInvited.length === 0) {
    return res.status(200).json({
      success: true,
      msg: "No private capsules found.",
    });
  }

  const privateCapsules = await Capsule.find({ _id: { $in: capsulesInvited } }).select(
    "title description content media releaseAt createdBy visibility isOpen"
  );

  if (privateCapsules.length === 0) {
    return res.status(200).json({
      success: true,
      msg: "No valid private capsules found.",
      data: privateCapsules,
    });
  }

  res.status(200).json({
    success: true,
    msg: "Private capsules retrieved successfully.",
    data: privateCapsules,
  });
});

const getUserPublicCapsule = catchAsyncErrors(async (req, res, next) => {

  const publicCapsules = await Capsule.find({
    visibility: "public",
    isOpen: true,
  }).select("title description content media releaseAt createdBy visibility isOpen");

  if (!publicCapsules || publicCapsules.length === 0) {
    return res.status(200).json({
      success: true,
      msg: "No public capsules available.",
      data: publicCapsules,
    });
  }

  res.status(200).json({
    success: true,
    msg: "Public capsules retrieved successfully.",
    data: publicCapsules,
  });
});


export { createCapsule, getUserCapsules, updateCapsuleStatus, getUserPrivateCapsule, getUserPublicCapsule, upload };
