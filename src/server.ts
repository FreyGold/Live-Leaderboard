import { updateLeaderboard } from 'cron/updateLeaderboard.cron.ts';
import app from './app.ts';
import cron from 'node-cron';

cron.schedule('1 * * * * *', async () => {
  console.log('Cron job running every minute');
  await updateLeaderboard();
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
