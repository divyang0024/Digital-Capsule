import { ErrorHandler } from "../utils/errorhandler.js";
import catchasyncerrors from "./catchasyncerrors.js";
import jwt from "jsonwebtoken";
import { User } from "../db/user.models.js";

const isAuthenticatedUser=catchasyncerrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

export{
    isAuthenticatedUser,
}