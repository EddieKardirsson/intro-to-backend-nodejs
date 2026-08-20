import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minLength: 4,
            maxLength: 256,
        },

        description: {
            type: String,
            required: true,
            trim: true,
            minLength: 4,
            maxLength: 1024,
        },

        age: {
            type: Number,
            required: true,
            min: 0
        }
    },

    {
        timestamps: true,
    }
);

export const Post = mongoose.model("Post", postSchema);