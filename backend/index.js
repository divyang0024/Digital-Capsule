import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from '../backend/routers/user.router.js'
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const port = process.env.PORT

//middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow all origins or specify your conditions
        callback(null, true); // Allow all origins
    },
    credentials: true // Allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json());    //allows your server to automatically parse incoming requests with a JSON payload
app.use("/api/user", userRouter);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})




//user creates an account
//data gets saved in db
//user logs in
//checks if user exist or not
//if exist logged in
//if not error
//have to use jwt