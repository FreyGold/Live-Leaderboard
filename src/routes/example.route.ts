import { Request, Response, Router } from 'express';
import { exampleFunction, pgDbExample } from 'services/example.service.ts';

const router = Router();

router.route('/').get(pgDbExample);

export default router;
