import express from "express";
import { Router } from "express";
import { User } from "../db/user.models.js";
import authenticateToken from "../middleware/tokenAuthentication.middleware.js";

const router = Router();

// Regular expression for email validation
function isEmail(input) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    console.log("isEmail?", emailPattern.test(input));
    return emailPattern.test(input);
}

router.post("/signup", async (req, res) => {
    try {
        const { name, email, username, password, dob, gender, bio } = req.body;

        // Check if any required field is missing
        const anyFieldMissing = [name, email, username, password, dob, gender].some(field => field === "");
        if (anyFieldMissing) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if email or username already exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });

        if (userExists) {
            return res.status(400).json({ message: "Username or Email already exists" });
        }

        // Create new user if no duplicates are found
        const newUser = new User({ name, email, username, password, dob, gender, bio });
        await newUser.save();
        console.log("user created from backend", newUser);

        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        const cleanedUsername = username.trim().toLowerCase();
        let user = null

        console.log("username/email is : ", cleanedUsername);

        if (isEmail(cleanedUsername)) {
            user = await User.findOne({ email: cleanedUsername })
            console.log("User found by email:", user);
        }

        else {
            user = await User.findOne({ username: cleanedUsername })
            console.log("User found by username:", user);
        }

        if (user == null) {
            console.log("user credential", user)
            return res.status(401).json({ message: "User does not exists" })
        }


        const isMatch = await user.isPasswordCorrect(password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = await user.generateToken();
        await user.save()

        


        return res.status(200).cookie('token', token, { httpOnly: true, secure: true }).json({ message: "User logged in successfully", jwtToken: token });
    }
    catch (error) {
        console.error("Error during sign-in:", error);
        return res.status(500).json({ message: "Error during login", error: error.message });
    }
});

router.get("/protected", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Welcome to the protected route!", user: req.user });
})

export default router;
