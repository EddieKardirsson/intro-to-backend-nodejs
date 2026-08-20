import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

// before saving any password, we will hash it
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

// compare passwords
userSchema.methods.comparePassword = async function (password) {

    // DEBUG: If the password in the database is not encrypted, this if-statement should return true if the input is the same as the password in the database. This is a fallback for legacy passwords that were not hashed. You can remove this if-statement if you are sure all passwords are hashed.
    if (this.password === password) {
        return true;
    }

    // If the password in the database is hashed, we will compare the input password with the hashed password in the database using bcrypt.compare. This will return true if they match, false otherwise.
    return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);