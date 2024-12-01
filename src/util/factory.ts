import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from 'util/catchAsync.ts';
import prisma from 'util/prismaClient.ts';

type Model = keyof Partial<PrismaClient>;

const factory = (model: Model) => ({
  readRecord: async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const record = await prisma[model].findUnique({
      where: {
        id,
      },
    });

    if (!record) {
      return res
        .status(404)
        .json({ message: `No ${String(model)} with this id was found` });
    }

    res.status(200).json({
      status: 'success',
      record,
    });
  },

  createRecord: async (req: Request, res: Response) => {
    const record = await prisma[model].create({
      data: req.body,
    });

    res.status(201).json({
      status: 'success',
      model: record,
    });
  },
  deleteRecord: async (req: Request, res: Response) => {
    const record = await prisma[model].delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json({
      status: 'success',
      model: record,
    });
  },
  updateRecord: async (req: Request, res: Response) => {
    const record = await prisma[model].update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.status(200).json({
      status: 'success',
      model: record,
    });
  },
});

export default factory;
