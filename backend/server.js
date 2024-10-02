import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { ErrorHandler } from "./utils/errorhandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config({
  path: path.join(__dirname, "config/config.env"),
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is up and running at port ${process.env.PORT}`);
});
