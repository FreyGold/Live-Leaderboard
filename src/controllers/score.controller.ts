import { NextFunction, Request, Response } from 'express';
import { catchAsync } from 'util/catchAsync.ts';
import factory from 'util/factory.ts';

const scoreFactory = factory('score');

const readScore = catchAsync(async (req: Request, res: Response) => {
  await scoreFactory.readRecord(req, res);
});
const createScore = catchAsync(async (req: Request, res: Response) => {
  req.body = {
    score: req.body.score,
    user_id: req.body.user_id,
    game_id: req.body.game_id,
  };
  await scoreFactory.createRecord(req, res);
});
const deleteScore = catchAsync(async (req: Request, res: Response) => {
  scoreFactory.deleteRecord(req, res);
});
const updateScore = catchAsync(async (req: Request, res: Response) => {
  req.body = {
    score: req.body.score,
  };
  scoreFactory.updateRecord(req, res);
});

export { readScore, createScore, deleteScore, updateScore };
