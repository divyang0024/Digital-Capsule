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

// CORS setup
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}));

app.options('*', cors());

// Custom routes
app.use("/user", userRouters);
app.use("/capsule", capsuleRouters);

// Error handling middleware
app.use(errorMiddleware);

export default app;
