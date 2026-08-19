import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';

const router = Router();

// Define routes for user-related operations
router.route('/register').post(registerUser);

export default router;