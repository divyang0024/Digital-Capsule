import express from "express";
import morgan from "morgan";  
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();

// Global middleware
app.use(morgan("tiny"));  
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// Custom routes


// Error handling middleware
app.use(errorMiddleware);

export default app;
