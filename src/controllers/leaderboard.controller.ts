import { NextFunction, Request, Response } from 'express';
import { Redis } from 'ioredis';
import { catchAsync } from 'util/catchAsync.ts';
import prisma from 'util/prismaClient.ts';

const redisClient = new Redis();

const getTopPlayers = catchAsync(async (req: Request, res: Response) => {
  const limit: number = parseInt(req.body.limit) || 100;
  // zrevrange return all members of sorted set by descending order
  const topPlayerIds = await redisClient.zrevrange('leaderboard', 0, limit - 1);
  const topPlayersWithDetails = await Promise.all(
    topPlayerIds.map(async (user_id, index) => {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(user_id) },
        select: { id: true, username: true },
      });
      console.log('here');
      const score = await redisClient.zscore('leaderboard', user_id);
      console.log(score);
      console.log('here too');
      return {
        rank: index + 1,
        user_id: user.id,
        username: user.username,
        score: parseFloat(score),
      };
    })
  );

  if (!topPlayersWithDetails) {
    console.error('Error fetching top players');
    return res.status(400).json({
      status: 'fail',
      topPlayers: [],
    });
  }
  res.status(200).json({
    status: 'success',
    topPlayersWithDetails,
  });
});

const getPlayerRank = catchAsync(async (req: Request, res: Response) => {
  const user_id: number = parseInt(req.params.user_id);
  if (!user_id) {
    console.error('provide a valid user id');
    return res.status(400).json({
      status: 'fail',
    });
  }
  // Retrieve top players from Redis sorted set in descending order
  const rank = await redisClient.zrevrank('leaderboard', user_id);
  // Fetch user details for these top players
  const score = await redisClient.zscore('leaderboard', user_id);
  const player = {
    rank: rank + 1,
    user_id: user_id,
    score: parseFloat(score),
  };
  res.status(200).json({
    status: 'success',
    player,
  });
});

export { getTopPlayers, getPlayerRank };
