import { Redis } from 'ioredis';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from 'util/catchAsync.ts';

const redisClient = new Redis();

const updateScores = (req: Request, res: Response) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userExists = await redisClient.zrank('leaderboard', req.body.user_id);
    if (userExists === null) {
      await redisClient.zadd('leaderboard', req.body.score, req.body.user_id);
    } else {
      await redisClient.zincrby(
        'leaderboard',
        req.body.score,
        req.body.user_id
      );
    }
    next();
  });

export { updateScores };
