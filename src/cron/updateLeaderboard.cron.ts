import { Redis } from 'ioredis';
import prisma from 'util/prismaClient.ts';

const redisClient = new Redis();

async function updateLeaderboard() {
  try {
    // Step 1: Fetch all scores and aggregate by user using Prisma
    const scores = await prisma.score.groupBy({
      by: ['user_id'],
      _sum: {
        score: true,
      },
    });

    // Step 2: For each user, update the global leaderboard in Redis
    scores.forEach(({ user_id, _sum }) => {
      const totalScore = _sum.score;

      // Update or add the user's total score in Redis sorted set
      redisClient.zadd('leaderboard', totalScore, user_id, (err, res) => {
        if (err) {
          console.error('Error updating leaderboard for user:', user_id, err);
        } else {
          console.log(`Updated leaderboard for user ${user_id}:`, res);
        }
      });
    });

    console.log('Leaderboard update completed.');
  } catch (err) {
    console.error('Error fetching scores:', err);
  } finally {
    // Close the Prisma connection
    await prisma.$disconnect();
  }
}

export { updateLeaderboard };
