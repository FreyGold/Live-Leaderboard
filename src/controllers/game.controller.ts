import { Request, Response } from 'express';
import { catchAsync } from 'util/catchAsync.ts';
import factory from 'util/factory.ts';

const gameFactory = factory('game');

const readGame = catchAsync(async (req: Request, res: Response) => {
  await gameFactory.readRecord(req, res);
});
const createGame = catchAsync(async (req: Request, res: Response) => {
  req.body = {
    name: req.body.name,
    rating: req.body.rating,
  };
  await gameFactory.createRecord(req, res);
});
const deleteGame = catchAsync(async (req: Request, res: Response) => {
  gameFactory.deleteRecord(req, res);
});
const updateGame = catchAsync(async (req: Request, res: Response) => {
  req.body = {
    name: req.body.name,
    rating: req.body.rating,
  };
  console.log(req.body);
  gameFactory.updateRecord(req, res);
});

const readAllGames = catchAsync(async (req: Request, res: Response) => {
  gameFactory.getAllRecords(req, res);
});

export { readGame, createGame, deleteGame, updateGame, readAllGames };
