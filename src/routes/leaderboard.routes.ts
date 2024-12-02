import {
  getPlayerRank,
  getTopPlayers,
} from 'controllers/leaderboard.controller.ts';
import express from 'express';

const router = express.Router();

router.route('/').get(getTopPlayers);
router.route('/:user_id').get(getPlayerRank);

export default router;
