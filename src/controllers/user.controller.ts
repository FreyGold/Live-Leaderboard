import { Request, Response } from 'express';
import { catchAsync } from 'util/catchAsync.ts';
import factory from 'util/factory.ts';

const userFactory = factory('user');

const readUser = catchAsync(async (req: Request, res: Response) => {
  await userFactory.readRecord(req, res);
});
const createUser = catchAsync(async (req: Request, res: Response) => {
  req.body = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  await userFactory.createRecord(req, res);
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  userFactory.deleteRecord(req, res);
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  req.body = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  userFactory.updateRecord(req, res);
});

export { readUser, createUser, deleteUser, updateUser };
