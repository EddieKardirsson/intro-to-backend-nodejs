import { Post } from "../models/post.model.js";

// Create a new post
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        // Basic validation
        if (!name || !description || age === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new post
        const post = await Post.create({
            name,
            description,
            age
        });

        res.status(201).json({
            message: "Post created successfully",
            post: { id: post._id, name: post.name, description: post.description, age: post.age, createdAt: post.createdAt, updatedAt: post.updatedAt }
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating post", error: error.message });
    }
};

// Helper function to handle errors on getting posts
function errorFetching(res, error) {
    res.status(500).json({message: "Error fetching posts", error: error.message});
}

// Read all posts
const getPosts = async (req, res) => {
    try {
        const getAllPosts = await Post.find();
        res.status(200).json({
            message: "Posts fetched successfully",
            posts: getAllPosts
        });

    } catch (error) {
        errorFetching(res, error);
    }
}

const getPostByName = async (req, res) => {
    try {
        const { name } = req.params;
        const post = await Post.findOne({ name: new RegExp(`^${name}$`, "i") });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({
            message: "Post fetched successfully",
            post
        });
    } catch (error) {
        errorFetching(res, error);
    }
};

const updatePost = async (req, res) => {
    try {
        // basic validation to check if the body is empty
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is empty" });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({
            message: "Post updated successfully",
            post
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating post", error: error.message });
    }
}

const deletePost = async (req, res) => {
    try {

        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error: error.message });
    }
}

export {
    createPost,
    getPosts,
    getPostByName,
    updatePost,
    deletePost
};