import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import { router as userRouters } from "./routes/userroutes.js";
import { router as capsuleRouters } from "./routes/capsuleroute.js";

const app = express();

// Global middleware
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// CORS setup with more specific configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://digital-capsule.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['set-cookie']
}));

// Add CORS headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie');
  res.header('Access-Control-Expose-Headers', 'set-cookie'); // Add this line
  next();
});

// Custom routes
app.use("/user", userRouters);
app.use("/capsule", capsuleRouters);

// Error handling middleware
app.use(errorMiddleware);

export default app;