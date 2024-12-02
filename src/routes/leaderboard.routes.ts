import { getTopPlayers } from 'controllers/leaderboard.controller.ts';
import express from 'express';

const router = express.Router();

router.route('/').get(getTopPlayers);
