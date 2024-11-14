import express from "express";
const router = express.Router();
import * as userControls from "../controllers/usercontrollers.js"
import { isAuthenticatedUser } from "../middlewares/auth.js";
import fileUpload from "express-fileupload";

router.route("/register").post(fileUpload(),userControls.registerUser);
router.route("/login").post(userControls.loginUser);
router.route("/logout").post(userControls.logoutUser);
router.route("/me").get(isAuthenticatedUser,userControls.getUserDetails);

export {
    router,
}