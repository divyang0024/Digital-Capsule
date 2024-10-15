import express from "express";
const router = express.Router();
import * as userControls from "../controllers/usercontrollers.js"
import { isAuthenticatedUser } from "../middlewares/auth.js";

router.route("/register").post(userControls.registerUser);
router.route("/login").post(userControls.loginUser);
router.route("/logout").get(userControls.logoutUser);
router.route("/me").get(isAuthenticatedUser,userControls.getUserDetails);

export {
    router,
}