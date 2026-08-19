import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
    },

    password: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 75
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    }

},

    {
        timestamps: true,
    }

);

export const User = mongoose.model("User", userSchema);