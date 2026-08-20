import { Router } from 'express';
import { createPost, getPosts, getPostByName, updatePost, deletePost } from '../controllers/post.controller.js';

const router = Router();

// Define routes for post-related operations
router.route('/create').post(createPost);
router.route('/').get(getPosts);
router.route('/:name').get(getPostByName);
router.route('/update/:id').patch(updatePost);
router.route('/delete/:id').delete(deletePost);
export default router;