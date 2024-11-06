import { Request, Response, Router } from 'express';
import { createUser, getUser } from 'services/example.service.ts';

const router = Router();

router.route('/').get(getUser).post(createUser);

export default router;
