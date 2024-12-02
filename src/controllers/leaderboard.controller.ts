import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { catchAsync } from 'util/catchAsync.ts';
import prisma from 'util/prismaClient.ts';

const redisClient = new Redis();

const getTopPlayers = catchAsync(async (req: Request, res: Response) => {
  const limit: number = parseInt(req.body.limit) || 100;
  // Retrieve top players from Redis sorted set in descending order
  const topPlayerIds = await redisClient.zrevrange('leaderboard', 0, limit - 1);
  console.log(topPlayerIds);
  // Fetch user details for these top players
  const topPlayersWithDetails = await Promise.all(
    topPlayerIds.map(async (user_id, index) => {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(user_id) },
        select: { id: true, username: true },
      });

      // Get the score for this user
      const score = await redisClient.zscore('leaderboard', user_id);

      return {
        rank: index + 1,
        userId: user.id,
        username: user.username,
        score: parseFloat(score),
      };
    })
  );

  if (!topPlayersWithDetails) {
    console.error('Error fetching top players');
    return [];
  }
  return topPlayersWithDetails;
});

export { getTopPlayers };
