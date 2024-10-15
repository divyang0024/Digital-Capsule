import express from "express";
import morgan from "morgan";  
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"; 
import { errorMiddleware } from "./middlewares/error.js";
import { router as userRouters } from "./routes/userroutes.js";

const app = express();

// Global middleware
app.use(morgan("tiny"));  
app.use(fileUpload());  
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(express.json());

// Custom routes
app.use("/user", userRouters);

// Error handling middleware
app.use(errorMiddleware);

export default app;
