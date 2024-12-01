import {
  createGame,
  deleteGame,
  readGame,
  updateGame,
} from 'controllers/game.controller.ts';
import express from 'express';

const router = express.Router();

// CRUD on score by id
router.route('/:id').get(readGame).delete(deleteGame).patch(updateGame);
router.route('/new-game').post(createGame);
// Read all scores
router.route('/').get();

export default router;
