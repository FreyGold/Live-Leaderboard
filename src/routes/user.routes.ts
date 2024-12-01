import { readUser, updateUser } from 'controllers/user.controller.ts';
import express from 'express';

const router = express.Router();

router.get('/:id', readUser);
router.patch('/:id', updateUser);

export default router;
