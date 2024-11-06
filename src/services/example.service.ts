import { NextFunction, Request, Response } from 'express';
import { catchAsync } from 'util/catchAsync.ts';
import prisma from 'util/prismaClient.ts';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: req.body.password,
        name: req.body.password,
      },
    });
    res.status(200).json({
      message: 'good',
      user,
    });
  }
);

const getUser = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: 'not found',
      });
    }

    const { email, password } = user;
    res.status(200).json({
      message: 'doable',
      email: email,
      password: password,
    });
  }
);

export { createUser, getUser };
