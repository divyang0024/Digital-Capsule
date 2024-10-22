import express from "express";
import { createCapsule, upload } from "../controllers/capsulecontroller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticatedUser,upload.array('media', 5), createCapsule);

export { router };
