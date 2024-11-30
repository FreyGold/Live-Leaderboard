import { Request, Response } from 'express';
import { catchAsync } from 'util/catchAsync.ts';
import prisma from 'util/prismaClient.ts';

const readScore = catchAsync(async (req: Request, res: Response) => {
  const score = await prisma.score.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!score) {
    return res.status(400).json({ message: 'no score with this id was found' });
  }
  res.status(200).json({
    status: 'success',
    score: score,
  });
});

const createScore = catchAsync(async (req: Request, res: Response) => {
  const score = await prisma.score.create({
    data: {
      score: req.body.score,
      user_id: req.body.userId,
      game_id: req.body.gameId,
    },
  });

  res.status(201).json({
    status: 'success',
    score: score,
  });
});

const deleteScore = catchAsync(async (req: Request, res: Response) => {
  const score = await prisma.score.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  res.status(200).json({
    status: 'success',
    score: score,
  });
});

const updateScore = catchAsync(async (req: Request, res: Response) => {
  const score = await prisma.score.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      score: req.body.score,
    },
  });

  res.status(200).json({
    status: 'success',
    score: score,
  });
});
export { readScore, createScore, deleteScore, updateScore };
