import {
  authenticateUser,
  logoutUser,
  registerUser,
} from 'controllers/auth.controller.ts';
import express from 'express';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authenticateUser);
router.post('/logout', logoutUser);

export default router;
