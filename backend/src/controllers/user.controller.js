import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Basic validation
        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Create a new user

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });

        //const newUser = new User({ username, password, email });
        //await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, email: user.email, username: user.username }
        });

    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try{

        // checking if the user already exists
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Update the user's logged-in status
        user.loggedIn = true;

        res.status(200).json({
            message: "User logged in successfully",
            user: { id: user._id, email: user.email, username: user.username }
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in user", error: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's logged-in status
        user.loggedIn = false;

        res.status(200).json({
            message: "User logged out successfully",
            user: { id: user._id, email: user.email, username: user.username }
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging out user", error: error.message });
    }
};

export{
    registerUser,
    loginUser,
    logoutUser
};