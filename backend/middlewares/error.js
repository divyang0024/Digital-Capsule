import { ErrorHandler } from "../utils/errorhandler.js";

const errorMiddleware=(err,req,res,next)=>{
   err.statusCode = err.statusCode || 500;
   err.message = err.message || "Internal server error";

  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === 'JsonWebTokenError') {
    const message = 'JSON Web Token is invalid. Try Again!!!';
    err = new ErrorHandler(message, 400);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'JSON Web Token is expired. Try Again!!!';
    err = new ErrorHandler(message, 400);
  }

    res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}

export { errorMiddleware };