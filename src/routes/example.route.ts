import { Request, Response, Router } from 'express';
import { exampleFunction, getUser } from 'services/example.service.ts';

const router = Router();

router.route('/').get(getUser);

export default router;
