import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import { router as userRouters } from "./routes/userroutes.js";
import { router as capsuleRouters } from "./routes/capsuleroute.js";

const app = express();

// Global middleware
app.use(morgan("tiny")); // Logging HTTP requests
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded bodies
app.use(cookieParser()); // Parsing cookies
app.use(express.json()); // Parsing JSON bodies

// Allowed origins for CORS
const allowedOrigins = ['http://localhost:5173', 'https://yaad-gaar.vercel.app'];

// CORS setup with dynamic origin
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow requests with no origin (e.g., mobile apps, Postman)
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS")); // Reject other origins
    }
  },
  credentials: true, // Allow credentials like cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Allow these headers in requests
  exposedHeaders: ['set-cookie'], // Allow clients to access these headers
}));

// Explicit handling of preflight requests
app.options('*', cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['set-cookie'],
}));

// CORS headers middleware (fallback)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie');
  res.header('Access-Control-Expose-Headers', 'set-cookie');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Custom routes
app.use("/user", userRouters); // User-related routes
app.use("/capsule", capsuleRouters); // Capsule-related routes

// Error handling middleware
app.use(errorMiddleware); // Centralized error handling

export default app;
