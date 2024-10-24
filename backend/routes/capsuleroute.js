import express from "express";
import { createCapsule,getUserCapsules, upload } from "../controllers/capsulecontroller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticatedUser,upload.array('media', 5), createCapsule);
router.get("/me", isAuthenticatedUser, getUserCapsules);

export { router };
