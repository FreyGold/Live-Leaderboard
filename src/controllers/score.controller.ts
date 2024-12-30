import { Request, Response } from 'express';
import { updateScores } from 'middleware/caching.middleware.ts';
import { catchAsync } from 'util/catchAsync.ts';
import factory from 'util/factory.ts';
import prisma from 'util/prismaClient.ts';

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
  const user = await prisma.user.findUnique({
    where: {
      id: req.body.user_id,
    },
  });
  if (!user) {
    return res.sendStatus(404);
  }
  updateScores(req, res);
  await scoreFactory.createRecord(req, res);
});
const deleteScore = catchAsync(async (req: Request, res: Response) => {
  scoreFactory.deleteRecord(req, res);
});
const updateScore = catchAsync(async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.body.user_id,
    },
  });
  if (!user) {
    return res.sendStatus(404);
  }
  req.body = {
    score: req.body.score,
  };
  updateScores(req, res);
  scoreFactory.updateRecord(req, res);
});

const readAllScores = catchAsync(async (req: Request, res: Response) => {
  scoreFactory.getAllRecords(req, res);
});

export { readScore, createScore, deleteScore, updateScore, readAllScores };
