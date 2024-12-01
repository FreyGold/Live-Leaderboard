import {
  createScore,
  deleteScore,
  readAllScores,
  readScore,
  updateScore,
} from 'controllers/score.controller.ts';
import express from 'express';

const router = express.Router();

// CRUD on score by id
router.route('/:id').get(readScore).delete(deleteScore).patch(updateScore);
router.route('/new-score').post(createScore);
// Read all scores
router.route('/').get(readAllScores);

export default router;
