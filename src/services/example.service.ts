import { QueryResult } from 'pg';
import { pool } from '../util/db.ts';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from 'util/catchAsync.ts';

interface userRow {
  email: string;
  password: string;
}

const exampleFunction = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json({
      message: 'good',
    });
  }
);

const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user: QueryResult<userRow> = await pool.query(
      `Select email, password from users where id = ${req.body.userId}`
    );
    const { email, password } = user.rows[0];
    res.status(200).json({
      message: 'doable',
      email: email,
      password: password,
    });
  }
);

export { exampleFunction, getUser };
